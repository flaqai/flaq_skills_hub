import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer as createNetServer } from 'node:net';
import { join } from 'node:path';
import test from 'node:test';

import type { CredentialStore } from '../src/auth/credential-store.ts';
import { SESSION_HEADER } from '../src/constants.ts';
import { readLocalSession } from '../src/runtime/session.ts';
import { startServer } from '../src/server/server.ts';

class MemoryCredentialStore implements CredentialStore {
  value: string | null = null;

  async clear() { this.value = null; }
  async get() { return this.value; }
  async has() { return this.value !== null; }
  async set(value: string) { this.value = value; }
}

async function availablePort(): Promise<number> {
  const server = createNetServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Could not allocate a test port.');
  }
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return address.port;
}

test('protects local management APIs with the session token', async () => {
  const runtimeDirectory = await mkdtemp(join(process.cwd(), '.flaq-cli-test-'));
  const previousRuntimeDirectory = process.env.FLAQ_CLI_HOME;
  process.env.FLAQ_CLI_HOME = runtimeDirectory;
  const credentialStore = new MemoryCredentialStore();
  let directFileName = '';
  let directFileType = '';
  let directFileContent = '';
  const upstreamCanary = 'UPSTREAM-PROVIDER-KEY-CANARY';
  let runningServer: Awaited<ReturnType<typeof startServer>> | undefined;

  try {
    runningServer = await startServer({
      apiFetchImplementation: async (_input, init) => {
        assert.equal(init?.redirect, 'error');
        if (init?.body instanceof FormData) {
          assert.equal(new Headers(init.headers).get('content-type'), null);
          const file = init.body.get('image_url_list');
          assert.ok(file instanceof Blob);
          directFileName = (file as Blob & { name?: string }).name ?? '';
          directFileType = file.type;
          directFileContent = await file.text();
          return Response.json({
            code: 0,
            message: 'success',
            data: { task_id: 'task-direct-file', task_status: 'submitted' },
          });
        }
        return Response.json(
          {
            code: 5000,
            message: `Provider failed with key ${upstreamCanary}`,
            raw: { authorization: `Bearer ${upstreamCanary}` },
          },
          { status: 502 },
        );
      },
      apiBaseUrl: 'https://api.example.test',
      credentialStore,
      port: await availablePort(),
    });
    const healthResponse = await fetch(`${runningServer.url}/health`);
    assert.equal(healthResponse.status, 401);

    const unauthorizedResponse = await fetch(`${runningServer.url}/api/auth/status`);
    assert.equal(unauthorizedResponse.status, 401);

    const session = await readLocalSession();
    const headers = {
      'Content-Type': 'application/json',
      [SESSION_HEADER]: session.token,
    };
    const authorizedHealthResponse = await fetch(`${runningServer.url}/health`, { headers });
    assert.equal(authorizedHealthResponse.status, 200);
    const saveResponse = await fetch(`${runningServer.url}/api/auth/key`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ clientKey: 'test-client-key' }),
    });
    assert.equal(saveResponse.status, 200);
    assert.equal(credentialStore.value, 'test-client-key');

    const directFile = join(runtimeDirectory, 'reference.png');
    await writeFile(directFile, 'direct-file-content');
    const directFileResponse = await fetch(`${runningServer.url}/api/tasks/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        confirmed: true,
        mediaType: 'image',
        input: {
          model_name: 'gpt-image-2-edit',
          prompt: 'Use the local reference',
          image_url_list: [directFile],
        },
      }),
    });
    assert.equal(directFileResponse.status, 200);
    assert.equal(directFileName, 'reference.png');
    assert.equal(directFileType, 'image/png');
    assert.equal(directFileContent, 'direct-file-content');

    const modelsResponse = await fetch(`${runningServer.url}/api/models`, { headers });
    assert.equal(modelsResponse.status, 200);
    const modelsBody = await modelsResponse.json() as { data: { models: unknown[] } };
    assert.equal(modelsBody.data.models.length, 3);

    const modelResponse = await fetch(`${runningServer.url}/api/models/gpt-image-2`, { headers });
    assert.equal(modelResponse.status, 200);

    const reloadResponse = await fetch(`${runningServer.url}/api/models/reload`, {
      method: 'POST',
      headers,
    });
    assert.equal(reloadResponse.status, 200);

    const invalidTaskResponse = await fetch(`${runningServer.url}/api/tasks/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        confirmed: true,
        mediaType: 'video',
        input: {
          model_name: 'seedance-v2.5-image-to-video',
          prompt: 'Camera pulls back',
          resolution: '720p',
          duration: 8,
          aspect_ratio: '16:9',
          image_url: 'https://example.com/frame.jpg',
        },
      }),
    });
    assert.equal(invalidTaskResponse.status, 400);

    const upstreamErrorResponse = await fetch(`${runningServer.url}/api/tasks/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        confirmed: true,
        mediaType: 'image',
        input: {
          model_name: 'gpt-image-2',
          prompt: 'Security canary request',
          width: 16,
          height: 9,
          resolution: '1k',
          quality: 'medium',
        },
      }),
    });
    assert.equal(upstreamErrorResponse.status, 502);
    const upstreamErrorBody = await upstreamErrorResponse.text();
    assert.match(upstreamErrorBody, /SERVER_INTERNAL_ERROR/);
    assert.doesNotMatch(upstreamErrorBody, new RegExp(upstreamCanary));
    assert.doesNotMatch(upstreamErrorBody, /"details"|"raw"/);

    const logDatesResponse = await fetch(`${runningServer.url}/api/logs/dates`, { headers });
    assert.equal(logDatesResponse.status, 200);
    const logDatesBody = await logDatesResponse.json() as {
      data: { currentDate: string; dates: string[]; directory: string };
    };
    assert.equal(logDatesBody.data.directory, join(runtimeDirectory, 'logs'));
    assert.ok(logDatesBody.data.dates.includes(logDatesBody.data.currentDate));

    const logsResponse = await fetch(
      `${runningServer.url}/api/logs?date=${encodeURIComponent(logDatesBody.data.currentDate)}`,
      { headers },
    );
    assert.equal(logsResponse.status, 200);
    const logsBody = await logsResponse.json() as { data: { raw: string } };
    assert.match(logsBody.data.raw, /auth\.client-key\.save/);
    assert.match(logsBody.data.raw, /task\.submit/);
    assert.doesNotMatch(logsBody.data.raw, new RegExp(`test-client-key|${upstreamCanary}`));

    const clearDateResponse = await fetch(
      `${runningServer.url}/api/logs?date=${encodeURIComponent(logDatesBody.data.currentDate)}`,
      { method: 'DELETE', headers },
    );
    assert.equal(clearDateResponse.status, 200);
    const clearedLogsResponse = await fetch(
      `${runningServer.url}/api/logs?date=${encodeURIComponent(logDatesBody.data.currentDate)}`,
      { headers },
    );
    const clearedLogsBody = await clearedLogsResponse.json() as { data: { raw: string } };
    assert.equal(clearedLogsBody.data.raw, '');
  } finally {
    await runningServer?.close();
    if (previousRuntimeDirectory === undefined) {
      delete process.env.FLAQ_CLI_HOME;
    } else {
      process.env.FLAQ_CLI_HOME = previousRuntimeDirectory;
    }
    await rm(runtimeDirectory, { recursive: true, force: true });
  }
});
