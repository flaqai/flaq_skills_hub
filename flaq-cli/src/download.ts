import { createWriteStream } from 'node:fs';
import { mkdir, unlink } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { basename, extname, join, resolve } from 'node:path';

import { FlaqCliError } from './errors.ts';
import type { FetchImplementation } from './api/client.ts';
import { normalizeRemoteResourceUrl } from './security/remote-url.ts';
import type { DownloadedFile, MediaType, TaskData, TaskResultItem } from './types.ts';

const CONTENT_TYPE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'video/mp4': '.mp4',
  'video/quicktime': '.mov',
  'video/webm': '.webm',
};

function resultItems(mediaType: MediaType, task: TaskData): TaskResultItem[] {
  const result = task.task_result;
  const items = mediaType === 'image' ? result?.images : result?.videos;
  if (!Array.isArray(items) || items.length === 0) {
    throw new FlaqCliError({
      category: 'protocol',
      code: 'MISSING_RESULT_URLS',
      message: `Task ${task.task_id} completed without ${mediaType} result URLs.`,
      retryable: false,
    });
  }
  return items;
}

function fileExtension(remoteUrl: string, contentType: string | null, mediaType: MediaType): string {
  const urlExtension = extname(basename(new URL(remoteUrl).pathname)).toLowerCase();
  if (/^\.[a-z0-9]{2,5}$/.test(urlExtension)) {
    return urlExtension;
  }

  const normalizedContentType = contentType?.split(';', 1)[0]?.trim().toLowerCase();
  return normalizedContentType && CONTENT_TYPE_EXTENSIONS[normalizedContentType]
    ? CONTENT_TYPE_EXTENSIONS[normalizedContentType]
    : mediaType === 'image' ? '.bin' : '.mp4';
}

export async function downloadTaskResults(
  mediaType: MediaType,
  task: TaskData,
  outputDirectory: string,
  fetchImplementation: FetchImplementation = fetch,
): Promise<DownloadedFile[]> {
  const resolvedOutputDirectory = resolve(outputDirectory);
  await mkdir(resolvedOutputDirectory, { recursive: true, mode: 0o755 });
  const downloads: DownloadedFile[] = [];

  try {
    for (const [index, item] of resultItems(mediaType, task).entries()) {
      if (typeof item.url !== 'string' || !item.url) {
        throw new FlaqCliError({
          category: 'protocol',
          code: 'INVALID_RESULT_URL',
          message: `Task ${task.task_id} returned an invalid result URL at index ${index}.`,
          retryable: false,
        });
      }

      const remoteUrl = normalizeRemoteResourceUrl(item.url, `task result URL at index ${index}`);
      const response = await fetchImplementation(remoteUrl, { redirect: 'error' });
      if (!response.ok || !response.body) {
        throw new FlaqCliError({
          category: 'download',
          code: 'RESULT_DOWNLOAD_FAILED',
          message: `Failed to download result ${index + 1} with HTTP ${response.status}.`,
          retryable: response.status >= 500,
          httpStatus: response.status,
        });
      }

      const extension = fileExtension(remoteUrl, response.headers.get('content-type'), mediaType);
      const localPath = join(resolvedOutputDirectory, `${task.task_id}-${index + 1}${extension}`);
      const output = createWriteStream(localPath, { flags: 'wx', mode: 0o644 });

      try {
        await pipeline(Readable.fromWeb(response.body as never), output);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
          throw new FlaqCliError({
            category: 'download',
            code: 'OUTPUT_FILE_EXISTS',
            message: `Refusing to overwrite existing file: ${localPath}`,
            retryable: false,
          });
        }
        await unlink(localPath).catch(() => undefined);
        throw error;
      }

      downloads.push({
        remoteUrl,
        localPath,
        bytes: Number(response.headers.get('content-length') ?? 0),
      });
    }
  } catch (error) {
    await Promise.all(downloads.map((download) => unlink(download.localPath).catch(() => undefined)));
    throw error;
  }

  return downloads;
}
