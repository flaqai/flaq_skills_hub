import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

import { FlaqApiClient } from '../src/api/client.ts';
import { prepareTaskRequest } from '../src/api/task-request.ts';
import type { ModelOperationConfig } from '../src/catalog/types.ts';
import { FlaqCliError } from '../src/errors.ts';

function mediaOperation(fieldName: string, extensions?: string[]): ModelOperationConfig {
  return {
    id: 'reference-to-output',
    modelName: 'example-model',
    requiredFields: [fieldName],
    optionalFields: [],
    prohibitedFields: [],
    fields: {
      [fieldName]: {
        type: 'string-array',
        format: 'media-input',
        ...(extensions === undefined ? {} : { resourceLimits: { extensions } }),
      },
    },
  };
}

test('submits image tasks with a bearer Client Key', async () => {
  let authorization = '';
  let redirect: RequestRedirect | undefined;
  let requestBody: unknown;
  const client = new FlaqApiClient({
    baseUrl: 'https://api.example.test',
    getClientKey: async () => 'secret-key',
    fetchImplementation: async (_input, init) => {
      authorization = new Headers(init?.headers).get('authorization') ?? '';
      redirect = init?.redirect;
      requestBody = JSON.parse(String(init?.body));
      return Response.json({
        code: 0,
        message: 'success',
        data: {
          task_id: 'task-1',
          task_status: 'submitted',
          response_url: 'https://api.example.test/api/v1/image/task-1',
        },
      });
    },
  });

  const task = await client.submitTask('image', { model_name: 'gpt-image-2', prompt: 'Example' });
  assert.equal(authorization, 'Bearer secret-key');
  assert.equal(redirect, 'error');
  assert.deepEqual(requestBody, { model_name: 'gpt-image-2', prompt: 'Example' });
  assert.equal(task.task_id, 'task-1');
});

test('submits local media and remote URLs together as multipart without overriding the boundary', async () => {
  const directory = await mkdtemp(join(process.cwd(), '.flaq-cli-api-test-'));
  const localFile = join(directory, 'reference.png');
  await writeFile(localFile, 'png-content');
  try {
    let contentType = 'unset';
    let requestBody: FormData | undefined;
    const client = new FlaqApiClient({
      baseUrl: 'https://api.example.test',
      getClientKey: async () => 'secret-key',
      fetchImplementation: async (_input, init) => {
        contentType = new Headers(init?.headers).get('content-type') ?? '';
        requestBody = init?.body as FormData;
        return Response.json({
          code: 0,
          message: 'success',
          data: { task_id: 'task-multipart', task_status: 'submitted' },
        });
      },
    });

    await client.submitTask('image', {
      model_name: 'example-model',
      references: [localFile, 'https://cdn.example.test/reference.webp'],
    }, mediaOperation('references', ['png', 'webp']));

    assert.equal(contentType, '');
    assert.ok(requestBody instanceof FormData);
    const references = requestBody.getAll('references');
    assert.equal(references.length, 2);
    assert.ok(references[0] instanceof Blob);
    assert.equal((references[0] as Blob & { name?: string }).name, 'reference.png');
    assert.equal((references[0] as Blob).type, 'image/png');
    assert.equal(await (references[0] as Blob).text(), 'png-content');
    assert.equal(references[1], 'https://cdn.example.test/reference.webp');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('maps a local .mpeg audio filename to .mp3 for multipart submission', async () => {
  const directory = await mkdtemp(join(process.cwd(), '.flaq-cli-api-test-'));
  const localFile = join(directory, 'voice.MPEG');
  await writeFile(localFile, 'mpeg-content');
  try {
    const prepared = await prepareTaskRequest({
      model_name: 'example-model',
      audios: [localFile],
    }, mediaOperation('audios', ['mpeg']));
    assert.equal(prepared.multipart, true);
    assert.ok(prepared.body instanceof FormData);
    const audio = prepared.body.get('audios');
    assert.ok(audio instanceof Blob);
    assert.equal((audio as Blob & { name?: string }).name, 'voice.mp3');
    assert.equal(audio.type, 'audio/mpeg');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('rejects a non-loopback HTTP API before reading the Client Key', async () => {
  let keyReads = 0;
  assert.throws(
    () => new FlaqApiClient({
      baseUrl: 'http://api.example.test',
      getClientKey: async () => {
        keyReads += 1;
        return 'secret-key';
      },
    }),
    (error: unknown) => {
      assert.ok(error instanceof FlaqCliError);
      assert.equal(error.machine.code, 'INSECURE_API_BASE_URL');
      return true;
    },
  );
  assert.equal(keyReads, 0);
});

test('does not expose raw upstream error bodies or messages', async () => {
  const canary = 'UPSTREAM-PLATFORM-KEY-CANARY';
  const client = new FlaqApiClient({
    baseUrl: 'https://api.example.test',
    getClientKey: async () => 'client-key',
    fetchImplementation: async () => Response.json(
      {
        code: 5000,
        message: `Provider failed with key ${canary}`,
        details: { authorization: `Bearer ${canary}` },
      },
      { status: 502 },
    ),
  });

  await assert.rejects(
    () => client.getTask('image', 'task-1'),
    (error: unknown) => {
      assert.ok(error instanceof FlaqCliError);
      assert.equal(error.machine.message, 'The Flaq API encountered an internal error.');
      assert.equal('details' in error.machine, false);
      assert.doesNotMatch(JSON.stringify(error.machine), new RegExp(canary));
      return true;
    },
  );
});

test('does not expose a raw provider failure message in task data', async () => {
  const canary = 'FAILED-TASK-PROVIDER-KEY-CANARY';
  const client = new FlaqApiClient({
    baseUrl: 'https://api.example.test',
    getClientKey: async () => 'client-key',
    fetchImplementation: async () => Response.json({
      code: 0,
      message: 'success',
      data: {
        task_id: 'task-failed',
        task_status: 'failed',
        task_status_msg: `Provider key ${canary}`,
      },
    }),
  });

  const task = await client.getTask('image', 'task-failed');
  assert.equal(task.task_status_msg, 'Generation failed. Review the task in Flaq for provider details.');
  assert.doesNotMatch(JSON.stringify(task), new RegExp(canary));
});

test('preserves Flaq business authentication codes', async () => {
  const client = new FlaqApiClient({
    baseUrl: 'https://api.example.test',
    getClientKey: async () => 'invalid-key',
    fetchImplementation: async () => Response.json(
      { code: 1001, message: 'Authorization is invalid', data: null },
      { status: 401 },
    ),
  });

  await assert.rejects(
    () => client.getTask('video', 'task-2'),
    (error: unknown) => {
      assert.ok(error instanceof FlaqCliError);
      assert.equal(error.machine.code, 'AUTHENTICATION_FAILED');
      assert.equal(error.machine.businessCode, '1001');
      return true;
    },
  );
});
