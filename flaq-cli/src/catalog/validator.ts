import { isAbsolute } from 'node:path';

import { MODEL_CATALOG_SCHEMA_VERSION } from '../constants.ts';
import { FlaqCliError } from '../errors.ts';
import type {
  MediaResourceLimits,
  ModelConfig,
  ModelFieldRule,
  ModelOperationConfig,
} from './types.ts';

const MODEL_KEYS = new Set(['schemaVersion', 'id', 'vendor', 'mediaType', 'operations']);
const OPERATION_KEYS = new Set([
  'id',
  'modelName',
  'requiredFields',
  'optionalFields',
  'prohibitedFields',
  'fields',
  'constraints',
]);
const FIELD_KEYS = new Set([
  'type',
  'values',
  'minimum',
  'maximum',
  'minLength',
  'maxLength',
  'minItems',
  'maxItems',
  'format',
  'default',
  'resourceLimits',
]);
const RESOURCE_KEYS = new Set([
  'extensions',
  'itemDurationSeconds',
  'maxItemBytes',
  'totalDurationSeconds',
]);
const CONSTRAINT_KEYS = new Set(['allowedPairs', 'allOrNone', 'atLeastOne']);
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FIELD_NAME = /^[a-z][a-z0-9_]*$/;

export interface CatalogValidationIssue {
  file: string;
  message: string;
  path: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function addUnknownKeys(
  value: Record<string, unknown>,
  allowedKeys: Set<string>,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
): void {
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) {
      issues.push({ file, path: `${path}.${key}`, message: 'Unknown field.' });
    }
  }
}

function readString(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
  pattern?: RegExp,
): string | undefined {
  if (typeof value !== 'string' || !value || (pattern && !pattern.test(value))) {
    issues.push({ file, path, message: pattern ? 'Must be a non-empty lowercase kebab-case string.' : 'Must be a non-empty string.' });
    return undefined;
  }
  return value;
}

function readStringArray(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
  pattern: RegExp = FIELD_NAME,
): string[] | undefined {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !pattern.test(item))) {
    issues.push({ file, path, message: 'Must be an array of valid strings.' });
    return undefined;
  }
  const result = value as string[];
  if (new Set(result).size !== result.length) {
    issues.push({ file, path, message: 'Must not contain duplicate values.' });
  }
  return result;
}

function readNonNegativeInteger(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
  positive = false,
): number | undefined {
  if (!Number.isInteger(value) || (value as number) < (positive ? 1 : 0)) {
    issues.push({ file, path, message: positive ? 'Must be a positive integer.' : 'Must be a non-negative integer.' });
    return undefined;
  }
  return value as number;
}

function validateRange(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
  requireMin: boolean,
): { min: number; max: number } | { max: number } | undefined {
  if (!isRecord(value)) {
    issues.push({ file, path, message: 'Must be an object.' });
    return undefined;
  }
  const allowed = requireMin ? new Set(['min', 'max']) : new Set(['max']);
  addUnknownKeys(value, allowed, file, path, issues);
  const max = value.max;
  const min = value.min;
  if (typeof max !== 'number' || !Number.isFinite(max) || max <= 0) {
    issues.push({ file, path: `${path}.max`, message: 'Must be a positive number.' });
    return undefined;
  }
  if (!requireMin) {
    return { max };
  }
  if (typeof min !== 'number' || !Number.isFinite(min) || min < 0 || min > max) {
    issues.push({ file, path: `${path}.min`, message: 'Must be a non-negative number no greater than max.' });
    return undefined;
  }
  return { min, max };
}

function validateResourceLimits(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
): MediaResourceLimits | undefined {
  if (!isRecord(value)) {
    issues.push({ file, path, message: 'Must be an object.' });
    return undefined;
  }
  addUnknownKeys(value, RESOURCE_KEYS, file, path, issues);
  const result: MediaResourceLimits = {};
  if (value.extensions !== undefined) {
    const extensions = readStringArray(value.extensions, file, `${path}.extensions`, issues, /^[a-z0-9]+$/);
    if (extensions) result.extensions = extensions;
  }
  if (value.itemDurationSeconds !== undefined) {
    const range = validateRange(value.itemDurationSeconds, file, `${path}.itemDurationSeconds`, issues, true);
    if (range && 'min' in range) result.itemDurationSeconds = range;
  }
  if (value.totalDurationSeconds !== undefined) {
    const range = validateRange(value.totalDurationSeconds, file, `${path}.totalDurationSeconds`, issues, false);
    if (range && !('min' in range)) result.totalDurationSeconds = range;
  }
  if (value.maxItemBytes !== undefined) {
    const maxItemBytes = readNonNegativeInteger(value.maxItemBytes, file, `${path}.maxItemBytes`, issues, true);
    if (maxItemBytes !== undefined) result.maxItemBytes = maxItemBytes;
  }
  return result;
}

function valueMatchesRule(value: unknown, rule: ModelFieldRule): boolean {
  if (rule.type === 'string') return typeof value === 'string';
  if (rule.type === 'number') return typeof value === 'number' && Number.isFinite(value);
  if (rule.type === 'boolean') return typeof value === 'boolean';
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function validateFieldRule(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
): ModelFieldRule | undefined {
  if (!isRecord(value)) {
    issues.push({ file, path, message: 'Must be an object.' });
    return undefined;
  }
  addUnknownKeys(value, FIELD_KEYS, file, path, issues);
  if (!['boolean', 'number', 'string', 'string-array'].includes(value.type as string)) {
    issues.push({ file, path: `${path}.type`, message: 'Must be boolean, number, string, or string-array.' });
    return undefined;
  }
  const rule: ModelFieldRule = { type: value.type as ModelFieldRule['type'] };
  if (value.format !== undefined) {
    if (!['http-url', 'media-input'].includes(value.format as string) || (rule.type !== 'string' && rule.type !== 'string-array')) {
      issues.push({ file, path: `${path}.format`, message: 'http-url and media-input are only valid for string and string-array fields.' });
    } else {
      rule.format = value.format as NonNullable<ModelFieldRule['format']>;
    }
  }
  for (const key of ['minimum', 'maximum'] as const) {
    if (value[key] !== undefined) {
      if (rule.type !== 'number' || typeof value[key] !== 'number' || !Number.isFinite(value[key])) {
        issues.push({ file, path: `${path}.${key}`, message: 'Must be a finite number on a number field.' });
      } else {
        rule[key] = value[key];
      }
    }
  }
  for (const key of ['minLength', 'maxLength'] as const) {
    if (value[key] !== undefined) {
      const parsed = readNonNegativeInteger(value[key], file, `${path}.${key}`, issues);
      if (rule.type !== 'string') {
        issues.push({ file, path: `${path}.${key}`, message: 'Only valid on a string field.' });
      } else if (parsed !== undefined) {
        rule[key] = parsed;
      }
    }
  }
  for (const key of ['minItems', 'maxItems'] as const) {
    if (value[key] !== undefined) {
      const parsed = readNonNegativeInteger(value[key], file, `${path}.${key}`, issues);
      if (rule.type !== 'string-array') {
        issues.push({ file, path: `${path}.${key}`, message: 'Only valid on a string-array field.' });
      } else if (parsed !== undefined) {
        rule[key] = parsed;
      }
    }
  }
  if (value.values !== undefined) {
    if (!Array.isArray(value.values) || value.values.length === 0 || value.values.some((item) => !valueMatchesRule(item, rule))) {
      issues.push({ file, path: `${path}.values`, message: 'Must be a non-empty array matching the field type.' });
    } else if (rule.type === 'string-array') {
      issues.push({ file, path: `${path}.values`, message: 'values is not supported for string-array fields.' });
    } else {
      rule.values = value.values as Array<boolean | number | string>;
    }
  }
  if (value.default !== undefined) {
    if (!valueMatchesRule(value.default, rule)) {
      issues.push({ file, path: `${path}.default`, message: 'Must match the field type.' });
    } else {
      rule.default = value.default as boolean | number | string | string[];
    }
  }
  if (value.resourceLimits !== undefined) {
    if (rule.type !== 'string' && rule.type !== 'string-array') {
      issues.push({ file, path: `${path}.resourceLimits`, message: 'Only valid on string and string-array fields.' });
    } else {
      const resourceLimits = validateResourceLimits(value.resourceLimits, file, `${path}.resourceLimits`, issues);
      if (resourceLimits) rule.resourceLimits = resourceLimits;
    }
  }
  if (rule.minimum !== undefined && rule.maximum !== undefined && rule.minimum > rule.maximum) {
    issues.push({ file, path, message: 'minimum must not exceed maximum.' });
  }
  if (rule.minLength !== undefined && rule.maxLength !== undefined && rule.minLength > rule.maxLength) {
    issues.push({ file, path, message: 'minLength must not exceed maxLength.' });
  }
  if (rule.minItems !== undefined && rule.maxItems !== undefined && rule.minItems > rule.maxItems) {
    issues.push({ file, path, message: 'minItems must not exceed maxItems.' });
  }
  if (rule.values && new Set(rule.values).size !== rule.values.length) {
    issues.push({ file, path: `${path}.values`, message: 'Must not contain duplicate values.' });
  }
  if (rule.values) {
    for (const allowedValue of rule.values) {
      const error = validateInputValue('Allowed value', allowedValue, rule);
      if (error) issues.push({ file, path: `${path}.values`, message: error });
    }
  }
  if (rule.default !== undefined) {
    const error = validateInputValue('Default value', rule.default, rule);
    if (error) issues.push({ file, path: `${path}.default`, message: error });
  }
  return rule;
}

function validateConstraintGroups(
  value: unknown,
  fieldNames: Set<string>,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
): string[][] | undefined {
  if (!Array.isArray(value) || value.some((group) => !Array.isArray(group) || group.length < 2)) {
    issues.push({ file, path, message: 'Must be an array of field groups containing at least two fields.' });
    return undefined;
  }
  const groups: string[][] = [];
  for (let index = 0; index < value.length; index += 1) {
    const group = readStringArray(value[index], file, `${path}[${index}]`, issues);
    if (!group) continue;
    for (const field of group) {
      if (!fieldNames.has(field)) {
        issues.push({ file, path: `${path}[${index}]`, message: `Unknown field ${field}.` });
      }
    }
    groups.push(group);
  }
  return groups;
}

function validateAllowedPairs(
  value: unknown,
  fieldNames: Set<string>,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
): NonNullable<ModelOperationConfig['constraints']>['allowedPairs'] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    issues.push({ file, path, message: 'Must be a non-empty array.' });
    return undefined;
  }
  const result: NonNullable<ModelOperationConfig['constraints']>['allowedPairs'] = [];
  for (let index = 0; index < value.length; index += 1) {
    const itemPath = `${path}[${index}]`;
    const item = value[index];
    if (!isRecord(item)) {
      issues.push({ file, path: itemPath, message: 'Must be an object.' });
      continue;
    }
    addUnknownKeys(item, new Set(['fields', 'values']), file, itemPath, issues);
    const fields = readStringArray(item.fields, file, `${itemPath}.fields`, issues);
    if (!fields || fields.length !== 2) {
      issues.push({ file, path: `${itemPath}.fields`, message: 'Must contain exactly two fields.' });
      continue;
    }
    if (fields.some((field) => !fieldNames.has(field))) {
      issues.push({ file, path: `${itemPath}.fields`, message: 'Contains an unknown field.' });
    }
    if (!Array.isArray(item.values) || item.values.length === 0 || item.values.some((pair) => !Array.isArray(pair) || pair.length !== 2 || pair.some((number) => typeof number !== 'number' || !Number.isFinite(number)))) {
      issues.push({ file, path: `${itemPath}.values`, message: 'Must contain numeric two-value pairs.' });
      continue;
    }
    result.push({
      fields: fields as [string, string],
      values: item.values as Array<[number, number]>,
    });
  }
  return result;
}

function validateOperation(
  value: unknown,
  file: string,
  path: string,
  issues: CatalogValidationIssue[],
): ModelOperationConfig | undefined {
  if (!isRecord(value)) {
    issues.push({ file, path, message: 'Must be an object.' });
    return undefined;
  }
  addUnknownKeys(value, OPERATION_KEYS, file, path, issues);
  const id = readString(value.id, file, `${path}.id`, issues, KEBAB_CASE);
  const modelName = readString(value.modelName, file, `${path}.modelName`, issues);
  const requiredFields = readStringArray(value.requiredFields, file, `${path}.requiredFields`, issues);
  const optionalFields = readStringArray(value.optionalFields, file, `${path}.optionalFields`, issues);
  const prohibitedFields = readStringArray(value.prohibitedFields, file, `${path}.prohibitedFields`, issues);
  if (!isRecord(value.fields)) {
    issues.push({ file, path: `${path}.fields`, message: 'Must be an object.' });
    return undefined;
  }
  const fields: Record<string, ModelFieldRule> = {};
  for (const [fieldName, fieldValue] of Object.entries(value.fields)) {
    if (!FIELD_NAME.test(fieldName)) {
      issues.push({ file, path: `${path}.fields.${fieldName}`, message: 'Field name must use lowercase snake_case.' });
      continue;
    }
    const rule = validateFieldRule(fieldValue, file, `${path}.fields.${fieldName}`, issues);
    if (rule) fields[fieldName] = rule;
  }
  if (!id || !modelName || !requiredFields || !optionalFields || !prohibitedFields) return undefined;

  const declared = [...requiredFields, ...optionalFields, ...prohibitedFields];
  if (new Set(declared).size !== declared.length) {
    issues.push({ file, path, message: 'requiredFields, optionalFields, and prohibitedFields must be disjoint.' });
  }
  const usableFields = new Set([...requiredFields, ...optionalFields]);
  for (const fieldName of usableFields) {
    if (!fields[fieldName]) {
      issues.push({ file, path: `${path}.fields`, message: `Missing rule for declared field ${fieldName}.` });
    }
  }
  for (const fieldName of Object.keys(fields)) {
    if (!usableFields.has(fieldName)) {
      issues.push({ file, path: `${path}.fields.${fieldName}`, message: 'Field rule is not declared required or optional.' });
    }
  }

  let constraints: ModelOperationConfig['constraints'];
  if (value.constraints !== undefined) {
    if (!isRecord(value.constraints)) {
      issues.push({ file, path: `${path}.constraints`, message: 'Must be an object.' });
    } else {
      addUnknownKeys(value.constraints, CONSTRAINT_KEYS, file, `${path}.constraints`, issues);
      constraints = {};
      if (value.constraints.allowedPairs !== undefined) {
        const allowedPairs = validateAllowedPairs(value.constraints.allowedPairs, usableFields, file, `${path}.constraints.allowedPairs`, issues);
        if (allowedPairs) constraints.allowedPairs = allowedPairs;
      }
      if (value.constraints.allOrNone !== undefined) {
        const allOrNone = validateConstraintGroups(value.constraints.allOrNone, usableFields, file, `${path}.constraints.allOrNone`, issues);
        if (allOrNone) constraints.allOrNone = allOrNone;
      }
      if (value.constraints.atLeastOne !== undefined) {
        const atLeastOne = validateConstraintGroups(value.constraints.atLeastOne, usableFields, file, `${path}.constraints.atLeastOne`, issues);
        if (atLeastOne) constraints.atLeastOne = atLeastOne;
      }
    }
  }
  return { id, modelName, requiredFields, optionalFields, prohibitedFields, fields, ...(constraints ? { constraints } : {}) };
}

export function validateModelConfig(value: unknown, file: string): { config?: ModelConfig; issues: CatalogValidationIssue[] } {
  const issues: CatalogValidationIssue[] = [];
  if (!isRecord(value)) {
    return { issues: [{ file, path: '$', message: 'Model configuration must be an object.' }] };
  }
  addUnknownKeys(value, MODEL_KEYS, file, '$', issues);
  if (value.schemaVersion !== MODEL_CATALOG_SCHEMA_VERSION) {
    issues.push({ file, path: '$.schemaVersion', message: `Must equal supported version ${MODEL_CATALOG_SCHEMA_VERSION}.` });
  }
  const id = readString(value.id, file, '$.id', issues, KEBAB_CASE);
  const vendor = readString(value.vendor, file, '$.vendor', issues, KEBAB_CASE);
  if (value.mediaType !== 'image' && value.mediaType !== 'video') {
    issues.push({ file, path: '$.mediaType', message: 'Must be image or video.' });
  }
  if (!Array.isArray(value.operations) || value.operations.length === 0) {
    issues.push({ file, path: '$.operations', message: 'Must contain at least one operation.' });
    return { issues };
  }
  const operations: ModelOperationConfig[] = [];
  for (let index = 0; index < value.operations.length; index += 1) {
    const operation = validateOperation(value.operations[index], file, `$.operations[${index}]`, issues);
    if (operation) operations.push(operation);
  }
  const operationIds = operations.map((operation) => operation.id);
  if (new Set(operationIds).size !== operationIds.length) {
    issues.push({ file, path: '$.operations', message: 'Operation IDs must be unique within a model.' });
  }
  const modelNames = operations.map((operation) => operation.modelName);
  if (new Set(modelNames).size !== modelNames.length) {
    issues.push({ file, path: '$.operations', message: 'Backend modelName values must be unique within a model.' });
  }
  if (!id || !vendor || (value.mediaType !== 'image' && value.mediaType !== 'video') || issues.length > 0) {
    return { issues };
  }
  return {
    config: {
      schemaVersion: MODEL_CATALOG_SCHEMA_VERSION,
      id,
      vendor,
      mediaType: value.mediaType,
      operations,
    },
    issues,
  };
}

function hasValue(value: unknown): boolean {
  return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== '';
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isMediaInput(value: string): boolean {
  return isHttpUrl(value) || isAbsolute(value);
}

function validateInputValue(fieldName: string, value: unknown, rule: ModelFieldRule): string | undefined {
  if (!valueMatchesRule(value, rule)) return `${fieldName} must match type ${rule.type}.`;
  if (rule.type === 'string') {
    const text = value as string;
    if (rule.minLength !== undefined && text.length < rule.minLength) return `${fieldName} is shorter than ${rule.minLength}.`;
    if (rule.maxLength !== undefined && text.length > rule.maxLength) return `${fieldName} is longer than ${rule.maxLength}.`;
    if (rule.format === 'http-url' && !isHttpUrl(text)) return `${fieldName} must be an HTTP(S) URL.`;
    if (rule.format === 'media-input' && !isMediaInput(text)) return `${fieldName} must be an HTTP(S) URL or an absolute local path.`;
  }
  if (rule.type === 'number') {
    const number = value as number;
    if (rule.minimum !== undefined && number < rule.minimum) return `${fieldName} must be at least ${rule.minimum}.`;
    if (rule.maximum !== undefined && number > rule.maximum) return `${fieldName} must be at most ${rule.maximum}.`;
  }
  if (rule.type === 'string-array') {
    const values = value as string[];
    if (rule.minItems !== undefined && values.length < rule.minItems) return `${fieldName} must contain at least ${rule.minItems} item(s).`;
    if (rule.maxItems !== undefined && values.length > rule.maxItems) return `${fieldName} must contain at most ${rule.maxItems} item(s).`;
    if (rule.format === 'http-url' && values.some((item) => !isHttpUrl(item))) return `${fieldName} items must be HTTP(S) URLs.`;
    if (rule.format === 'media-input' && values.some((item) => !isMediaInput(item))) return `${fieldName} items must be HTTP(S) URLs or absolute local paths.`;
  }
  if (rule.values && !rule.values.includes(value as never)) return `${fieldName} must be one of the configured values.`;
  return undefined;
}

export function validateOperationInput(operation: ModelOperationConfig, input: Record<string, unknown>): void {
  const errors: string[] = [];
  const allowed = new Set(['model_name', ...operation.requiredFields, ...operation.optionalFields]);
  for (const fieldName of operation.requiredFields) {
    if (!hasValue(input[fieldName])) errors.push(`Missing required field ${fieldName}.`);
  }
  for (const fieldName of operation.prohibitedFields) {
    if (input[fieldName] !== undefined) errors.push(`Field ${fieldName} is prohibited.`);
  }
  for (const fieldName of Object.keys(input)) {
    if (!allowed.has(fieldName) && !operation.prohibitedFields.includes(fieldName)) errors.push(`Unknown field ${fieldName}.`);
  }
  for (const [fieldName, rule] of Object.entries(operation.fields)) {
    if (input[fieldName] === undefined) continue;
    const error = validateInputValue(fieldName, input[fieldName], rule);
    if (error) errors.push(error);
  }
  for (const group of operation.constraints?.allOrNone ?? []) {
    const present = group.filter((fieldName) => input[fieldName] !== undefined);
    if (present.length > 0 && present.length !== group.length) errors.push(`Fields ${group.join(', ')} must be provided together.`);
  }
  for (const group of operation.constraints?.atLeastOne ?? []) {
    if (!group.some((fieldName) => hasValue(input[fieldName]))) errors.push(`At least one of ${group.join(', ')} must be provided.`);
  }
  for (const pairConstraint of operation.constraints?.allowedPairs ?? []) {
    const [leftField, rightField] = pairConstraint.fields;
    if (input[leftField] === undefined && input[rightField] === undefined) continue;
    const allowed = pairConstraint.values.some(([left, right]) => input[leftField] === left && input[rightField] === right);
    if (!allowed) errors.push(`Fields ${leftField} and ${rightField} do not form an allowed pair.`);
  }
  if (errors.length > 0) {
    throw new FlaqCliError({
      category: 'request',
      code: 'MODEL_INPUT_INVALID',
      message: `Input does not match ${operation.modelName}.`,
      retryable: false,
      details: { errors, operation: operation.id, modelName: operation.modelName },
    });
  }
}
