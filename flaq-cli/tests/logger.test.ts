import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

import { DailyLogger } from '../src/runtime/logger.ts';

test('writes daily JSON logs and redacts credentials', async () => {
  const directory = await mkdtemp(join(process.cwd(), '.flaq-cli-logger-test-'));
  const now = new Date('2026-08-17T09:30:00.000Z');
  const logger = new DailyLogger({ directory, now: () => now });

  try {
    await logger.write({
      details: {
        access_token: 'access-token-secret',
        authorization: 'Bearer client-key-secret',
        clientKey: 'client-key-secret',
        input: {
          model_name: 'gpt-image-2',
          prompt: 'Visible troubleshooting prompt',
        },
        signedUrl: 'https://storage.example.test/signed-secret',
        sourceUrl: 'https://storage.example.test/file.png?X-Amz-Signature=query-secret&size=large',
        taskId: 'task-1',
      },
      message: 'Request used Bearer message-secret',
      durationMs: 125,
      operation: 'task.submit',
      status: 'succeeded',
    });

    assert.deepEqual(await logger.listDates(), ['2026-08-17']);
    const result = await logger.read('2026-08-17');
    assert.equal(result.entries.length, 1);
    assert.equal(result.entries[0]?.operation, 'task.submit');
    assert.equal(result.entries[0]?.durationMs, 125);
    assert.match(result.raw, /Visible troubleshooting prompt/);
    assert.match(result.raw, /task-1/);
    assert.doesNotMatch(result.raw, /access-token-secret|client-key-secret|signed-secret|query-secret|message-secret/);
    assert.match(result.raw, /\[REDACTED\]/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('rejects invalid log dates without reading arbitrary paths', async () => {
  const directory = await mkdtemp(join(process.cwd(), '.flaq-cli-logger-test-'));
  const logger = new DailyLogger({ directory });

  try {
    await assert.rejects(() => logger.read('../secrets'));
    await assert.rejects(() => logger.read('2026-02-31'));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('prunes expired logs and supports clearing one date or all dates', async () => {
  const directory = await mkdtemp(join(process.cwd(), '.flaq-cli-logger-test-'));
  let now = new Date('2026-08-01T09:30:00.000Z');
  const logger = new DailyLogger({ directory, now: () => now, retentionDays: 30 });

  try {
    await logger.write({ operation: 'first', status: 'succeeded' });
    now = new Date('2026-08-15T09:30:00.000Z');
    await logger.write({ operation: 'middle', status: 'succeeded' });
    now = new Date('2026-09-01T09:30:00.000Z');
    await logger.write({ operation: 'latest', status: 'succeeded' });

    assert.deepEqual(await logger.listDates(), ['2026-09-01', '2026-08-15']);
    await logger.clear('2026-08-15');
    assert.deepEqual(await logger.listDates(), ['2026-09-01']);
    await logger.clearAll();
    assert.deepEqual(await logger.listDates(), []);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
