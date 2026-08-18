import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

import { FlaqCliError } from '../src/errors.ts';
import { readLocalSession } from '../src/runtime/session.ts';

test('rejects a local session file that points to a remote host', async () => {
  const runtimeDirectory = await mkdtemp(join(process.cwd(), '.flaq-cli-session-test-'));
  const previousRuntimeDirectory = process.env.FLAQ_CLI_HOME;
  process.env.FLAQ_CLI_HOME = runtimeDirectory;

  try {
    await mkdir(runtimeDirectory, { recursive: true });
    await writeFile(join(runtimeDirectory, 'session.json'), `${JSON.stringify({
      host: 'attacker.example.test',
      pid: 123,
      port: 43127,
      startedAt: new Date().toISOString(),
      token: 'a'.repeat(43),
    })}\n`);

    await assert.rejects(
      () => readLocalSession(),
      (error: unknown) => {
        assert.ok(error instanceof FlaqCliError);
        assert.equal(error.machine.code, 'INVALID_LOCAL_SESSION');
        return true;
      },
    );
  } finally {
    if (previousRuntimeDirectory === undefined) {
      delete process.env.FLAQ_CLI_HOME;
    } else {
      process.env.FLAQ_CLI_HOME = previousRuntimeDirectory;
    }
    await rm(runtimeDirectory, { recursive: true, force: true });
  }
});
