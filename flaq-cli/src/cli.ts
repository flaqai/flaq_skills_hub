#!/usr/bin/env node
/**
 * Flaq CLI command entrypoint.
 * Usage: node --experimental-strip-types src/cli.ts --help
 * Packaged usage: ./flaq --help
 */

import { readFile } from 'node:fs/promises';

import { clientKeyCredentialStore } from './auth/credential-store.ts';
import { readSecret } from './auth/read-secret.ts';
import { loadModelCatalog } from './catalog/catalog.ts';
import {
  APP_NAME,
  APP_VERSION,
  DEFAULT_API_BASE_URL,
  DEFAULT_PORT,
} from './constants.ts';
import { asFlaqCliError, FlaqCliError, publicMachineError } from './errors.ts';
import { localRequest } from './local-client.ts';
import { modelCatalogDirectory } from './runtime/paths.ts';
import { normalizeRemoteApiBaseUrl, remoteApiOrigin } from './security/remote-url.ts';
import { startServer } from './server/server.ts';
import type { MediaType, RunTaskResult, TaskData } from './types.ts';

interface ParsedArguments {
  options: Map<string, string | true>;
  positionals: string[];
}

function parseArguments(args: string[]): ParsedArguments {
  const options = new Map<string, string | true>();
  const positionals: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index] as string;
    if (!argument.startsWith('--')) {
      positionals.push(argument);
      continue;
    }

    const optionName = argument.slice(2);
    const next = args[index + 1];
    if (next && !next.startsWith('--')) {
      options.set(optionName, next);
      index += 1;
    } else {
      options.set(optionName, true);
    }
  }

  return { options, positionals };
}

function optionString(parsed: ParsedArguments, name: string): string | undefined {
  const value = parsed.options.get(name);
  return typeof value === 'string' ? value : undefined;
}

function requireOption(parsed: ParsedArguments, name: string): string {
  const value = optionString(parsed, name);
  if (!value) {
    throw new FlaqCliError({
      category: 'request',
      code: 'CLI_OPTION_REQUIRED',
      message: `--${name} is required.`,
      retryable: false,
    });
  }
  return value;
}

function parseMediaType(parsed: ParsedArguments): MediaType {
  const mediaType = requireOption(parsed, 'media');
  if (mediaType !== 'image' && mediaType !== 'video') {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_MEDIA_TYPE',
      message: '--media must be image or video.',
      retryable: false,
    });
  }
  return mediaType;
}

async function readInputFile(path: string): Promise<Record<string, unknown>> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_INPUT_FILE',
      message: error instanceof Error ? error.message : 'Input file could not be read.',
      retryable: false,
    });
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_INPUT_FILE',
      message: 'Input file must contain a JSON object.',
      retryable: false,
    });
  }
  return parsed as Record<string, unknown>;
}

function outputJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value)}\n`);
}

function printHelp(): void {
  process.stdout.write(`${APP_NAME} ${APP_VERSION}

Usage:
  flaq auth set-key [--api-base-url ${DEFAULT_API_BASE_URL}]
  flaq auth status [--api-base-url ${DEFAULT_API_BASE_URL}]
  flaq auth clear [--api-base-url ${DEFAULT_API_BASE_URL}]
  flaq serve [--port ${DEFAULT_PORT}] [--api-base-url ${DEFAULT_API_BASE_URL}] [--open]
  flaq status
  flaq models list
  flaq models get --id MODEL_ID
  flaq models reload
  flaq models validate [--catalog-dir DIRECTORY]
  flaq task submit --media image|video --input-file request.json --confirmed
  flaq task get --media image|video --task-id TASK_ID
  flaq task wait --media image|video --task-id TASK_ID
  flaq task download --media image|video --task-id TASK_ID --output-dir DIRECTORY
  flaq task run --media image|video --input-file request.json --confirmed [--output-dir DIRECTORY]

Notes:
  Paid task submission requires --confirmed after explicit user approval.
  Configured media fields accept HTTP(S) URLs or absolute local file paths.
  Local files are sent with the generation request and use the Client Key.
`);
}

async function handleModels(action: string | undefined, parsed: ParsedArguments): Promise<void> {
  if (action === 'list') {
    const result = await localRequest<Record<string, unknown>>('/api/models');
    outputJson({ ok: true, data: result });
    return;
  }
  if (action === 'get') {
    const modelId = requireOption(parsed, 'id');
    const result = await localRequest<Record<string, unknown>>(`/api/models/${encodeURIComponent(modelId)}`);
    outputJson({ ok: true, data: result });
    return;
  }
  if (action === 'reload') {
    const result = await localRequest<Record<string, unknown>>('/api/models/reload', { method: 'POST' });
    outputJson({ ok: true, data: result });
    return;
  }
  if (action === 'validate') {
    const snapshot = await loadModelCatalog(optionString(parsed, 'catalog-dir') ?? modelCatalogDirectory());
    outputJson({
      ok: true,
      data: {
        directory: snapshot.directory,
        modelCount: snapshot.models.length,
        schemaVersion: snapshot.schemaVersion,
      },
    });
    return;
  }
  throw new FlaqCliError({
    category: 'request',
    code: 'UNKNOWN_MODELS_COMMAND',
    message: 'Models command must be list, get, reload, or validate.',
    retryable: false,
  });
}

async function handleAuth(action: string | undefined, parsed: ParsedArguments): Promise<void> {
  const apiBaseUrl = normalizeRemoteApiBaseUrl(optionString(parsed, 'api-base-url') ?? DEFAULT_API_BASE_URL);
  const credentialStore = clientKeyCredentialStore(apiBaseUrl);
  if (action === 'set-key') {
    const clientKey = await readSecret('Client Key: ', 'Client Key');
    await credentialStore.set(clientKey);
    outputJson({
      ok: true,
      data: { apiBaseUrl, configured: true, credentialOrigin: remoteApiOrigin(apiBaseUrl), storage: 'macos-keychain' },
    });
    return;
  }
  if (action === 'status') {
    outputJson({
      ok: true,
      data: {
        apiBaseUrl,
        configured: await credentialStore.has(),
        credentialOrigin: remoteApiOrigin(apiBaseUrl),
        remoteValidation: 'unavailable',
        storage: 'macos-keychain',
      },
    });
    return;
  }
  if (action === 'clear') {
    await credentialStore.clear();
    outputJson({ ok: true, data: { configured: false } });
    return;
  }
  throw new FlaqCliError({
    category: 'request',
    code: 'UNKNOWN_AUTH_COMMAND',
    message: 'Auth command must be set-key, status, or clear.',
    retryable: false,
  });
}

async function handleServe(parsed: ParsedArguments): Promise<void> {
  const portValue = optionString(parsed, 'port');
  const port = portValue === undefined ? DEFAULT_PORT : Number(portValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_PORT',
      message: '--port must be an integer between 1 and 65535.',
      retryable: false,
    });
  }

  const apiBaseUrl = normalizeRemoteApiBaseUrl(optionString(parsed, 'api-base-url') ?? DEFAULT_API_BASE_URL);
  const credentialStore = clientKeyCredentialStore(apiBaseUrl);
  const runningServer = await startServer({
    apiBaseUrl,
    credentialStore,
    openManagementPage: parsed.options.has('open'),
    port,
  });
  outputJson({
    ok: true,
    data: {
      url: runningServer.url,
      managementUrl: runningServer.url,
      authConfigured: await credentialStore.has(),
      apiBaseUrl,
    },
  });
}

async function handleTask(action: string | undefined, parsed: ParsedArguments): Promise<void> {
  const mediaType = parseMediaType(parsed);

  if (action === 'submit') {
    const input = await readInputFile(requireOption(parsed, 'input-file'));
    const task = await localRequest<TaskData>('/api/tasks/submit', {
      method: 'POST',
      body: JSON.stringify({
        confirmed: parsed.options.has('confirmed'),
        mediaType,
        input,
      }),
    });
    outputJson({ ok: true, data: task });
    return;
  }

  if (action === 'get' || action === 'wait') {
    const task = await localRequest<TaskData>(`/api/tasks/${action}`, {
      method: 'POST',
      body: JSON.stringify({ mediaType, taskId: requireOption(parsed, 'task-id') }),
    });
    outputJson({ ok: true, data: task });
    return;
  }

  if (action === 'download') {
    const result = await localRequest<RunTaskResult>('/api/tasks/download', {
      method: 'POST',
      body: JSON.stringify({
        mediaType,
        outputDirectory: requireOption(parsed, 'output-dir'),
        taskId: requireOption(parsed, 'task-id'),
      }),
    });
    outputJson({ ok: true, data: result });
    return;
  }

  if (action === 'run') {
    const input = await readInputFile(requireOption(parsed, 'input-file'));
    const result = await localRequest<RunTaskResult>('/api/tasks/run', {
      method: 'POST',
      body: JSON.stringify({
        confirmed: parsed.options.has('confirmed'),
        mediaType,
        input,
        outputDirectory: optionString(parsed, 'output-dir'),
      }),
    });
    outputJson({ ok: true, data: result });
    return;
  }

  throw new FlaqCliError({
    category: 'request',
    code: 'UNKNOWN_TASK_COMMAND',
    message: 'Task command must be submit, get, wait, download, or run.',
    retryable: false,
  });
}

async function main(): Promise<void> {
  const parsed = parseArguments(process.argv.slice(2));
  const [command, action] = parsed.positionals;

  if (command === 'version' || parsed.options.has('version')) {
    outputJson({ ok: true, data: { name: APP_NAME, version: APP_VERSION } });
    return;
  }
  if (!command || command === 'help' || parsed.options.has('help')) {
    printHelp();
    return;
  }
  if (command === 'auth') {
    await handleAuth(action, parsed);
    return;
  }
  if (command === 'serve') {
    await handleServe(parsed);
    return;
  }
  if (command === 'status') {
    const health = await localRequest<Record<string, unknown>>('/health');
    outputJson({ ok: true, data: health });
    return;
  }
  if (command === 'models') {
    await handleModels(action, parsed);
    return;
  }
  if (command === 'task') {
    await handleTask(action, parsed);
    return;
  }
  throw new FlaqCliError({
    category: 'request',
    code: 'UNKNOWN_COMMAND',
    message: `Unknown command: ${command}`,
    retryable: false,
  });
}

main().catch((error) => {
  const flaqError = asFlaqCliError(error);
  process.stderr.write(`${JSON.stringify({ ok: false, error: publicMachineError(flaqError.machine) })}\n`);
  process.exitCode = 1;
});
