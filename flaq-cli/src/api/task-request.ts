import { readFile, stat } from 'node:fs/promises';
import { basename, extname, isAbsolute } from 'node:path';

import { FlaqCliError } from '../errors.ts';
import type { ModelFieldRule, ModelOperationConfig } from '../catalog/types.ts';

interface PreparedTaskRequest {
  body: FormData | string;
  multipart: boolean;
}

const MIME_TYPES: Record<string, string> = {
  bmp: 'image/bmp',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  m4a: 'audio/mp4',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  mpeg: 'audio/mpeg',
  png: 'image/png',
  tiff: 'image/tiff',
  wav: 'audio/wav',
  webm: 'video/webm',
  webp: 'image/webp',
};

function localMediaPaths(input: Record<string, unknown>, operation: ModelOperationConfig): string[] {
  const paths: string[] = [];
  for (const [fieldName, rule] of Object.entries(operation.fields)) {
    if (rule.format !== 'media-input') {
      continue;
    }
    const value = input[fieldName];
    if (typeof value === 'string' && isAbsolute(value)) {
      paths.push(value);
    } else if (Array.isArray(value)) {
      paths.push(...value.filter((item): item is string => typeof item === 'string' && isAbsolute(item)));
    }
  }
  return paths;
}

function uploadName(path: string, extension: string): string {
  if (extension !== 'mpeg') {
    return basename(path);
  }
  const originalExtension = extname(path);
  return `${basename(path, originalExtension)}.mp3`;
}

async function appendLocalFile(
  form: FormData,
  fieldName: string,
  path: string,
  rule: ModelFieldRule,
): Promise<void> {
  const extension = extname(path).slice(1).toLowerCase();
  const mimeType = MIME_TYPES[extension];
  if (!extension || !mimeType) {
    throw new FlaqCliError({
      category: 'request',
      code: 'UNSUPPORTED_MEDIA_FILE',
      message: `Unsupported local media extension: ${extension || '(none)'}.`,
      retryable: false,
    });
  }
  if (rule.resourceLimits?.extensions && !rule.resourceLimits.extensions.includes(extension)) {
    throw new FlaqCliError({
      category: 'request',
      code: 'MEDIA_FILE_EXTENSION_NOT_ALLOWED',
      message: `${fieldName} does not allow .${extension} files.`,
      retryable: false,
    });
  }

  let fileStats;
  let bytes;
  try {
    fileStats = await stat(path);
    if (!fileStats.isFile()) {
      throw new Error('Path is not a file.');
    }
    bytes = await readFile(path);
  } catch {
    throw new FlaqCliError({
      category: 'request',
      code: 'LOCAL_MEDIA_FILE_UNREADABLE',
      message: `The local media file for ${fieldName} could not be read.`,
      retryable: false,
    });
  }

  if (rule.resourceLimits?.maxItemBytes !== undefined && bytes.byteLength > rule.resourceLimits.maxItemBytes) {
    throw new FlaqCliError({
      category: 'request',
      code: 'MEDIA_FILE_TOO_LARGE',
      message: `${fieldName} exceeds the configured ${rule.resourceLimits.maxItemBytes}-byte limit.`,
      retryable: false,
    });
  }
  form.append(fieldName, new Blob([bytes], { type: mimeType }), uploadName(path, extension));
}

async function appendMediaValue(
  form: FormData,
  fieldName: string,
  value: string,
  rule: ModelFieldRule,
): Promise<void> {
  if (isAbsolute(value)) {
    await appendLocalFile(form, fieldName, value, rule);
    return;
  }
  form.append(fieldName, value);
}

export async function prepareTaskRequest(
  input: Record<string, unknown>,
  operation?: ModelOperationConfig,
): Promise<PreparedTaskRequest> {
  if (!operation || localMediaPaths(input, operation).length === 0) {
    return { body: JSON.stringify(input), multipart: false };
  }

  const form = new FormData();
  for (const [fieldName, value] of Object.entries(input)) {
    const rule = operation.fields[fieldName];
    if (rule?.format === 'media-input') {
      if (typeof value === 'string') {
        await appendMediaValue(form, fieldName, value, rule);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          await appendMediaValue(form, fieldName, item as string, rule);
        }
      }
      continue;
    }
    if (Array.isArray(value)) {
      form.append(fieldName, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      form.append(fieldName, String(value));
    }
  }
  return { body: form, multipart: true };
}
