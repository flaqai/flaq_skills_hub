import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';

import { DEFAULT_API_BASE_URL, KEYCHAIN_ACCOUNT, KEYCHAIN_SERVICE } from '../constants.ts';
import { FlaqCliError } from '../errors.ts';
import { remoteApiOrigin } from '../security/remote-url.ts';

export interface CredentialStore {
  clear(): Promise<void>;
  get(): Promise<string | null>;
  has(): Promise<boolean>;
  set(value: string): Promise<void>;
}

interface MacOsKeychainCredentialStoreOptions {
  account?: string;
  credentialName?: string;
  emptyCode?: string;
  service?: string;
}

export interface ClientKeyCredentialIdentity {
  account: string;
  service: string;
}

interface CommandResult {
  exitCode: number;
  stderr: string;
  stdout: string;
}

function runCommand(command: string, args: string[], stdin?: string): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: process.env,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    child.stdout.on('data', (chunk: Buffer) => stdoutChunks.push(chunk));
    child.stderr.on('data', (chunk: Buffer) => stderrChunks.push(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({
        exitCode: code ?? 1,
        stdout: Buffer.concat(stdoutChunks).toString('utf8'),
        stderr: Buffer.concat(stderrChunks).toString('utf8'),
      });
    });

    child.stdin.end(stdin);
  });
}

export class MacOsKeychainCredentialStore implements CredentialStore {
  private readonly account: string;
  private readonly credentialName: string;
  private readonly emptyCode: string;
  private readonly service: string;

  constructor(options: MacOsKeychainCredentialStoreOptions = {}) {
    this.account = options.account ?? KEYCHAIN_ACCOUNT;
    this.credentialName = options.credentialName ?? 'Client Key';
    this.emptyCode = options.emptyCode ?? 'EMPTY_CLIENT_KEY';
    this.service = options.service ?? KEYCHAIN_SERVICE;
  }

  async clear(): Promise<void> {
    this.assertPlatform();
    const result = await runCommand('/usr/bin/security', [
      'delete-generic-password',
      '-a',
      this.account,
      '-s',
      this.service,
    ]);

    if (result.exitCode !== 0 && !result.stderr.includes('could not be found')) {
      throw this.commandError('KEYCHAIN_DELETE_FAILED', result.stderr);
    }
  }

  async get(): Promise<string | null> {
    this.assertPlatform();
    const result = await runCommand('/usr/bin/security', [
      'find-generic-password',
      '-a',
      this.account,
      '-s',
      this.service,
      '-w',
    ]);

    if (result.exitCode !== 0) {
      if (result.stderr.includes('could not be found')) {
        return null;
      }
      throw this.commandError('KEYCHAIN_READ_FAILED', result.stderr);
    }

    return result.stdout.replace(/[\r\n]+$/, '');
  }

  async has(): Promise<boolean> {
    this.assertPlatform();
    const result = await runCommand('/usr/bin/security', [
      'find-generic-password',
      '-a',
      this.account,
      '-s',
      this.service,
    ]);

    if (result.exitCode === 0) {
      return true;
    }
    if (result.stderr.includes('could not be found')) {
      return false;
    }
    throw this.commandError('KEYCHAIN_STATUS_FAILED', result.stderr);
  }

  async set(value: string): Promise<void> {
    this.assertPlatform();
    const normalized = value.trim();
    if (!normalized) {
      throw new FlaqCliError({
        category: 'authentication',
        code: this.emptyCode,
        message: `${this.credentialName} cannot be empty.`,
        retryable: false,
      });
    }

    const hexValue = Buffer.from(normalized, 'utf8').toString('hex');
    const command = `add-generic-password -U -a ${this.account} -s ${this.service} -X ${hexValue}\n`;
    const result = await runCommand('/usr/bin/security', ['-q', '-i'], command);

    if (result.exitCode !== 0 || result.stderr.includes('SecKeychain')) {
      throw this.commandError('KEYCHAIN_WRITE_FAILED', result.stderr);
    }
  }

  private assertPlatform(): void {
    if (process.platform !== 'darwin') {
      throw new FlaqCliError({
        category: 'platform',
        code: 'UNSUPPORTED_CREDENTIAL_PLATFORM',
        message: `Flaq CLI stores ${this.credentialName} in macOS Keychain and requires macOS.`,
        retryable: false,
      });
    }
  }

  private commandError(code: string, stderr: string): FlaqCliError {
    return new FlaqCliError({
      category: 'authentication',
      code,
      message: stderr.trim() || 'macOS Keychain operation failed.',
      retryable: false,
    });
  }
}

export function clientKeyCredentialIdentity(apiBaseUrl: string): ClientKeyCredentialIdentity {
  const origin = remoteApiOrigin(apiBaseUrl);
  const defaultOrigin = remoteApiOrigin(DEFAULT_API_BASE_URL);
  if (origin === defaultOrigin) {
    return { account: KEYCHAIN_ACCOUNT, service: KEYCHAIN_SERVICE };
  }

  const originHash = createHash('sha256').update(origin).digest('hex').slice(0, 24);
  return {
    account: `flaq-cli-origin-${originHash}`,
    service: 'ai.flaq.cli.client-key.origin',
  };
}

export function clientKeyCredentialStore(apiBaseUrl: string): CredentialStore {
  const identity = clientKeyCredentialIdentity(apiBaseUrl);
  const origin = remoteApiOrigin(apiBaseUrl);
  return new MacOsKeychainCredentialStore({
    account: identity.account,
    credentialName: `Client Key for ${origin}`,
    service: identity.service,
  });
}
