import { readdir, readFile } from 'node:fs/promises';
import { basename, relative, resolve, sep } from 'node:path';

import { MODEL_CATALOG_SCHEMA_VERSION } from '../constants.ts';
import { FlaqCliError } from '../errors.ts';
import type { MediaType } from '../types.ts';
import type { CatalogSnapshot, ModelConfig, ModelOperationConfig, ModelSummary } from './types.ts';
import { validateModelConfig, validateOperationInput, type CatalogValidationIssue } from './validator.ts';

const KEBAB_CASE_JSON = /^[a-z0-9]+(?:-[a-z0-9]+)*\.json$/;
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function collectJsonFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectJsonFiles(path));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(path);
    }
  }
  return files.sort();
}

function catalogError(directory: string, issues: CatalogValidationIssue[]): FlaqCliError {
  return new FlaqCliError({
    category: 'configuration',
    code: 'MODEL_CATALOG_INVALID',
    message: `Model catalog validation failed with ${issues.length} error(s).`,
    retryable: false,
    details: { directory, issues },
  });
}

export async function loadModelCatalog(directory: string): Promise<CatalogSnapshot> {
  let files: string[];
  try {
    files = await collectJsonFiles(directory);
  } catch (error) {
    throw new FlaqCliError({
      category: 'configuration',
      code: 'MODEL_CATALOG_UNREADABLE',
      message: error instanceof Error ? error.message : 'Model catalog could not be read.',
      retryable: false,
      details: { directory },
    });
  }
  if (files.length === 0) {
    throw catalogError(directory, [{ file: directory, path: '$', message: 'No model JSON files were found.' }]);
  }

  const models: ModelConfig[] = [];
  const modelFiles = new Map<ModelConfig, string>();
  const issues: CatalogValidationIssue[] = [];
  for (const file of files) {
    const relativePath = relative(directory, file);
    const segments = relativePath.split(sep);
    const fileName = basename(file);
    if (!KEBAB_CASE_JSON.test(fileName)) {
      issues.push({ file: relativePath, path: '$', message: 'Filename must use lowercase kebab-case.' });
    }
    if (segments.length < 2 || segments.slice(0, -1).some((segment) => !KEBAB_CASE.test(segment))) {
      issues.push({ file: relativePath, path: '$', message: 'JSON files must be inside lowercase kebab-case vendor directories.' });
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(await readFile(file, 'utf8'));
    } catch (error) {
      issues.push({ file: relativePath, path: '$', message: error instanceof Error ? error.message : 'Invalid JSON.' });
      continue;
    }
    const result = validateModelConfig(parsed, relativePath);
    issues.push(...result.issues);
    if (!result.config) continue;
    const fileId = fileName.slice(0, -5);
    if (result.config.id !== fileId) {
      issues.push({ file: relativePath, path: '$.id', message: `Must match filename ${fileId}.` });
    }
    if (result.config.vendor !== segments[0]) {
      issues.push({ file: relativePath, path: '$.vendor', message: `Must match vendor directory ${segments[0]}.` });
    }
    models.push(result.config);
    modelFiles.set(result.config, relativePath);
  }

  const ids = new Map<string, string>();
  const modelNames = new Map<string, string>();
  for (const model of models) {
    const modelFile = modelFiles.get(model) ?? model.id;
    const previousIdFile = ids.get(model.id);
    if (previousIdFile) {
      issues.push({ file: modelFile, path: '$.id', message: `Duplicate model ID also declared by ${previousIdFile}.` });
    } else {
      ids.set(model.id, modelFile);
    }
    for (const operation of model.operations) {
      const previousModel = modelNames.get(operation.modelName);
      if (previousModel) {
        issues.push({ file: modelFile, path: '$.operations', message: `Backend modelName ${operation.modelName} is also declared by ${previousModel}.` });
      } else {
        modelNames.set(operation.modelName, modelFile);
      }
    }
  }
  if (issues.length > 0) throw catalogError(directory, issues);
  return {
    directory,
    loadedAt: new Date().toISOString(),
    models: models.sort((left, right) => left.id.localeCompare(right.id)),
    schemaVersion: MODEL_CATALOG_SCHEMA_VERSION,
  };
}

export class ModelCatalog {
  #snapshot: CatalogSnapshot;

  private constructor(snapshot: CatalogSnapshot) {
    this.#snapshot = snapshot;
  }

  static async create(directory: string): Promise<ModelCatalog> {
    return new ModelCatalog(await loadModelCatalog(directory));
  }

  get(id: string): ModelConfig {
    const model = this.#snapshot.models.find((candidate) => candidate.id === id);
    if (!model) {
      throw new FlaqCliError({
        category: 'request',
        code: 'MODEL_NOT_FOUND',
        message: `Model ${id} is not available.`,
        retryable: false,
      });
    }
    return model;
  }

  list(): ModelSummary[] {
    return this.#snapshot.models.map((model) => ({
      id: model.id,
      mediaType: model.mediaType,
      operations: model.operations.map((operation) => ({ id: operation.id, modelName: operation.modelName })),
      vendor: model.vendor,
    }));
  }

  snapshot(): CatalogSnapshot {
    return this.#snapshot;
  }

  validateTaskInput(mediaType: MediaType, input: Record<string, unknown>): ModelOperationConfig {
    const modelName = input.model_name;
    if (typeof modelName !== 'string' || !modelName) {
      throw new FlaqCliError({
        category: 'request',
        code: 'MODEL_NAME_REQUIRED',
        message: 'Task input must contain model_name.',
        retryable: false,
      });
    }
    for (const model of this.#snapshot.models) {
      const operation = model.operations.find((candidate) => candidate.modelName === modelName);
      if (!operation) continue;
      if (model.mediaType !== mediaType) {
        throw new FlaqCliError({
          category: 'request',
          code: 'MODEL_MEDIA_TYPE_MISMATCH',
          message: `${modelName} requires media type ${model.mediaType}.`,
          retryable: false,
        });
      }
      validateOperationInput(operation, input);
      return operation;
    }
    throw new FlaqCliError({
      category: 'request',
      code: 'MODEL_OPERATION_NOT_FOUND',
      message: `No configured operation uses model_name ${modelName}.`,
      retryable: false,
    });
  }

  async reload(): Promise<CatalogSnapshot> {
    const nextSnapshot = await loadModelCatalog(this.#snapshot.directory);
    this.#snapshot = nextSnapshot;
    return nextSnapshot;
  }
}
