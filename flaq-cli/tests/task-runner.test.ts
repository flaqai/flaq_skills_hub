import assert from 'node:assert/strict';
import test from 'node:test';

import { TaskRunner } from '../src/api/task-runner.ts';
import { FlaqCliError } from '../src/errors.ts';
import type { FlaqApiClient } from '../src/api/client.ts';
import type { TaskData } from '../src/types.ts';

function createClient(tasks: TaskData[]): FlaqApiClient {
  let index = 0;
  return {
    getTask: async () => tasks[Math.min(index++, tasks.length - 1)] as TaskData,
  } as unknown as FlaqApiClient;
}

test('waits through submitted and processing states', async () => {
  const runner = new TaskRunner(createClient([
    { task_id: 'task-1', task_status: 'submitted' },
    { task_id: 'task-1', task_status: 'processing' },
    { task_id: 'task-1', task_status: 'succeed', task_result: { images: [{ url: 'https://example.test/a.png' }] } },
  ]), { pollIntervalMs: 1, timeoutMs: 1000 });

  const result = await runner.waitForCompletion('image', 'task-1');
  assert.equal(result.task_status, 'succeed');
});

test('returns a distinct generation failure', async () => {
  const runner = new TaskRunner(createClient([
    { task_id: 'task-2', task_status: 'failed', task_status_msg: 'Generation rejected' },
  ]), { pollIntervalMs: 1, timeoutMs: 1000 });

  await assert.rejects(
    () => runner.waitForCompletion('video', 'task-2'),
    (error: unknown) => {
      assert.ok(error instanceof FlaqCliError);
      assert.equal(error.machine.code, 'GENERATION_FAILED');
      return true;
    },
  );
});

test('downloads an already completed task without submitting a new task', async () => {
  const task: TaskData = {
    task_id: 'task-3',
    task_status: 'succeed',
    task_result: { images: [{ url: 'https://example.test/result.png' }] },
  };
  const runner = new TaskRunner(createClient([task]), {
    downloadResults: async (_mediaType, completedTask, outputDirectory) => [{
      bytes: 3,
      localPath: `${outputDirectory}/${completedTask.task_id}-1.png`,
      remoteUrl: 'https://example.test/result.png',
    }],
  });

  const result = await runner.downloadCompletedResults('image', 'task-3', '/output');
  assert.equal(result.task.task_id, 'task-3');
  assert.equal(result.downloads[0]?.localPath, '/output/task-3-1.png');
});

test('does not download a task that is still processing', async () => {
  const runner = new TaskRunner(createClient([
    { task_id: 'task-4', task_status: 'processing' },
  ]), {
    downloadResults: async () => [],
  });

  await assert.rejects(
    () => runner.downloadCompletedResults('video', 'task-4', '/output'),
    (error: unknown) => {
      assert.ok(error instanceof FlaqCliError);
      assert.equal(error.machine.code, 'TASK_NOT_COMPLETE');
      assert.equal(error.machine.retryable, true);
      return true;
    },
  );
});
