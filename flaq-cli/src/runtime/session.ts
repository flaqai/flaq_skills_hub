import { randomBytes, timingSafeEqual } from 'node:crypto';
import { chmod, readFile, rename, unlink, writeFile } from 'node:fs/promises';

import { FlaqCliError } from '../errors.ts';
import { ensureRuntimeDirectory, sessionFilePath } from './paths.ts';

export interface LocalSession {
  host: string;
  pid: number;
  port: number;
  startedAt: string;
  token: string;
}

export function createSessionToken(): string {
  return randomBytes(32).toString('base64url');
}

export function safeTokenEquals(left: string | undefined, right: string): boolean {
  if (!left) {
    return false;
  }
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export async function writeLocalSession(session: LocalSession): Promise<void> {
  await ensureRuntimeDirectory();
  const path = sessionFilePath();
  const nextPath = `${path}.${process.pid}.next`;
  await writeFile(nextPath, `${JSON.stringify(session)}\n`, { mode: 0o600 });
  await chmod(nextPath, 0o600);
  await rename(nextPath, path);
  await chmod(path, 0o600);
}

export async function readLocalSession(): Promise<LocalSession> {
  let content: string;
  try {
    content = await readFile(sessionFilePath(), 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new FlaqCliError({
        category: 'service',
        code: 'LOCAL_SERVICE_NOT_RUNNING',
        message: 'Flaq local service session was not found. Start the service first.',
        retryable: false,
      });
    }
    throw error;
  }

  let session: Partial<LocalSession>;
  try {
    session = JSON.parse(content) as Partial<LocalSession>;
  } catch {
    throw new FlaqCliError({
      category: 'service',
      code: 'INVALID_LOCAL_SESSION',
      message: 'Flaq local service session file is invalid.',
      retryable: false,
    });
  }

  if (
    (session.host !== '127.0.0.1' && session.host !== '::1') ||
    !Number.isInteger(session.port) ||
    (session.port as number) < 1 ||
    (session.port as number) > 65535 ||
    !Number.isInteger(session.pid) ||
    (session.pid as number) < 1 ||
    typeof session.startedAt !== 'string' ||
    Number.isNaN(Date.parse(session.startedAt)) ||
    typeof session.token !== 'string' ||
    !/^[A-Za-z0-9_-]{43}$/.test(session.token)
  ) {
    throw new FlaqCliError({
      category: 'service',
      code: 'INVALID_LOCAL_SESSION',
      message: 'Flaq local service session file is incomplete.',
      retryable: false,
    });
  }

  return session as LocalSession;
}

export async function clearLocalSession(expectedToken: string): Promise<void> {
  try {
    const current = await readLocalSession();
    if (!safeTokenEquals(current.token, expectedToken)) {
      return;
    }
    await unlink(sessionFilePath());
  } catch (error) {
    if (error instanceof FlaqCliError && error.machine.code === 'LOCAL_SERVICE_NOT_RUNNING') {
      return;
    }
    throw error;
  }
}
