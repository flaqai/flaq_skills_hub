import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

import { downloadTaskResults } from '../src/download.ts';
import type { FetchImplementation } from '../src/api/client.ts';

test('removes files created earlier in a failed multi-result download', async () => {
  const outputDirectory = await mkdtemp(join(process.cwd(), '.flaq-cli-download-test-'));
  let requestCount = 0;
  const fetchImplementation: FetchImplementation = async (_input, init) => {
    requestCount += 1;
    assert.equal(init?.redirect, 'error');
    return requestCount === 1
      ? new Response('image', { status: 200, headers: { 'content-type': 'image/png' } })
      : new Response('failed', { status: 500 });
  };

  try {
    await assert.rejects(() => downloadTaskResults('image', {
      task_id: 'task-cleanup',
      task_status: 'succeed',
      task_result: {
        images: [
          { url: 'https://example.test/one.png' },
          { url: 'https://example.test/two.png' },
        ],
      },
    }, outputDirectory, fetchImplementation));
    assert.deepEqual(await readdir(outputDirectory), []);
  } finally {
    await rm(outputDirectory, { recursive: true, force: true });
  }
});

test('rejects insecure result URLs before starting a download', async () => {
  const outputDirectory = await mkdtemp(join(process.cwd(), '.flaq-cli-download-test-'));
  let requestCount = 0;

  try {
    await assert.rejects(() => downloadTaskResults('image', {
      task_id: 'task-insecure-url',
      task_status: 'succeed',
      task_result: {
        images: [{ url: 'http://storage.example.test/result.png' }],
      },
    }, outputDirectory, async () => {
      requestCount += 1;
      return new Response('image');
    }));
    assert.equal(requestCount, 0);
    assert.deepEqual(await readdir(outputDirectory), []);
  } finally {
    await rm(outputDirectory, { recursive: true, force: true });
  }
});
