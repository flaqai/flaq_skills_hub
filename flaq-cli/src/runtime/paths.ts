import { mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function runtimeDirectory(): string {
  const override = process.env.FLAQ_CLI_HOME;
  if (override) {
    return override;
  }
  return join(homedir(), 'Library', 'Application Support', 'Flaq CLI');
}

export function sessionFilePath(): string {
  return join(runtimeDirectory(), 'session.json');
}

export function logDirectory(): string {
  const override = process.env.FLAQ_CLI_LOG_DIR;
  if (override) {
    return override;
  }

  const executableDirectory = dirname(process.execPath);
  const toolsDirectory = dirname(executableDirectory);
  if (basename(executableDirectory) === 'flaq-cli' && basename(toolsDirectory) === 'tools') {
    return join(dirname(toolsDirectory), 'workspace', '_logs');
  }

  return join(runtimeDirectory(), 'logs');
}

export function modelCatalogDirectory(): string {
  const override = process.env.FLAQ_MODEL_CATALOG_DIR;
  if (override) {
    return override;
  }

  const executableName = basename(process.execPath);
  if (executableName === 'flaq' || executableName.startsWith('flaq-')) {
    return join(dirname(process.execPath), 'model-catalog');
  }

  return join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'model-catalog');
}

export async function ensureRuntimeDirectory(): Promise<string> {
  const directory = runtimeDirectory();
  await mkdir(directory, { recursive: true, mode: 0o700 });
  return directory;
}
