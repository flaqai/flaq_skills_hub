import { appendFile, mkdir, readFile, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';

import { FlaqCliError } from '../errors.ts';
import { logDirectory as defaultLogDirectory } from './paths.ts';

export type LogLevel = 'error' | 'info';
export type LogStatus = 'failed' | 'started' | 'succeeded';

export interface LogRecord {
  details?: unknown;
  durationMs?: number;
  level: LogLevel;
  message?: string;
  operation: string;
  status: LogStatus;
  timestamp: string;
}

export interface WriteLogRecord {
  details?: unknown;
  durationMs?: number;
  level?: LogLevel;
  message?: string;
  operation: string;
  status: LogStatus;
}

interface DailyLoggerOptions {
  directory?: string;
  now?: () => Date;
  retentionDays?: number;
}

const LOG_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SECRET_KEYS = new Set([
  'accesstoken',
  'apikey',
  'authorization',
  'bootstraptoken',
  'clientkey',
  'cookie',
  'password',
  'refreshtoken',
  'secret',
  'sessiontoken',
  'signedurl',
]);

const SECRET_QUERY_KEYS = new Set([
  'access_token',
  'api_key',
  'authorization',
  'credential',
  'googleaccessid',
  'key',
  'signature',
  'sig',
  'token',
  'x-amz-credential',
  'x-amz-security-token',
  'x-amz-signature',
]);

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function localLogDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function normalizedKey(value: string): string {
  return value.replace(/[-_]/g, '').toLowerCase();
}

function sanitizeString(value: string): string {
  const withoutBearer = value.replace(/\bBearer\s+[^\s,;"']+/gi, 'Bearer [REDACTED]');
  let url: URL;
  try {
    url = new URL(withoutBearer);
  } catch {
    return withoutBearer;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return withoutBearer;
  }
  if (url.username) url.username = '[REDACTED]';
  if (url.password) url.password = '[REDACTED]';
  for (const key of [...url.searchParams.keys()]) {
    if (SECRET_QUERY_KEYS.has(key.toLowerCase())) {
      url.searchParams.set(key, '[REDACTED]');
    }
  }
  return url.toString();
}

function sanitizeValue(value: unknown, seen: WeakSet<object>): unknown {
  if (typeof value === 'string') {
    return sanitizeString(value);
  }
  if (value === null || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'bigint') {
    return value.toString();
  }
  if (value instanceof Error) {
    return {
      message: sanitizeString(value.message),
      name: value.name,
      ...(value.stack ? { stack: sanitizeString(value.stack) } : {}),
    };
  }
  if (typeof value !== 'object') {
    return String(value);
  }
  if (seen.has(value)) {
    return '[Circular]';
  }
  seen.add(value);
  if (Array.isArray(value)) {
    const sanitized = value.map((item) => sanitizeValue(item, seen));
    seen.delete(value);
    return sanitized;
  }
  const sanitized: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    sanitized[key] = SECRET_KEYS.has(normalizedKey(key))
      ? '[REDACTED]'
      : sanitizeValue(item, seen);
  }
  seen.delete(value);
  return sanitized;
}

export function sanitizeLogDetails(value: unknown): unknown {
  return sanitizeValue(value, new WeakSet());
}

function validateLogDate(date: string): void {
  if (!LOG_DATE_PATTERN.test(date)) {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_LOG_DATE',
      message: 'Log date must use YYYY-MM-DD.',
      retryable: false,
    });
  }
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_LOG_DATE',
      message: 'Log date is not a valid calendar date.',
      retryable: false,
    });
  }
}

export class DailyLogger {
  readonly directory: string;
  readonly retentionDays: number;
  private readonly now: () => Date;
  private lastPrunedDate = '';
  private pending: Promise<void> = Promise.resolve();

  constructor(options: DailyLoggerOptions = {}) {
    this.directory = options.directory ?? defaultLogDirectory();
    this.now = options.now ?? (() => new Date());
    this.retentionDays = options.retentionDays ?? 30;
    if (!Number.isInteger(this.retentionDays) || this.retentionDays < 1) {
      throw new FlaqCliError({
        category: 'configuration',
        code: 'INVALID_LOG_RETENTION',
        message: 'Log retention must be a positive number of days.',
        retryable: false,
      });
    }
  }

  currentDate(): string {
    return localLogDate(this.now());
  }

  filePath(date = this.currentDate()): string {
    validateLogDate(date);
    return join(this.directory, `${date}.log`);
  }

  write(record: WriteLogRecord): Promise<void> {
    const now = this.now();
    const timestamp = now.toISOString();
    const completeRecord: LogRecord = {
      level: record.level ?? (record.status === 'failed' ? 'error' : 'info'),
      operation: record.operation,
      status: record.status,
      timestamp,
      ...(record.details === undefined ? {} : { details: sanitizeLogDetails(record.details) }),
      ...(record.durationMs === undefined ? {} : { durationMs: record.durationMs }),
      ...(record.message === undefined ? {} : { message: sanitizeString(record.message) }),
    };
    const line = `${JSON.stringify(completeRecord)}\n`;
    const date = localLogDate(now);
    const write = this.pending.then(async () => {
      await mkdir(this.directory, { recursive: true, mode: 0o700 });
      if (this.lastPrunedDate !== date) {
        await this.pruneExpired(now);
        this.lastPrunedDate = date;
      }
      await appendFile(this.filePath(date), line, { encoding: 'utf8', mode: 0o600 });
    });
    this.pending = write.catch(() => {});
    return write;
  }

  clear(date: string): Promise<void> {
    validateLogDate(date);
    const clear = this.pending.then(async () => {
      try {
        await unlink(this.filePath(date));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          throw error;
        }
      }
    });
    this.pending = clear.catch(() => {});
    return clear;
  }

  clearAll(): Promise<void> {
    const clear = this.pending.then(async () => {
      let entries;
      try {
        entries = await readdir(this.directory, { withFileTypes: true });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          return;
        }
        throw error;
      }
      await Promise.all(entries
        .filter((entry) => entry.isFile() && LOG_DATE_PATTERN.test(entry.name.slice(0, -4)) && entry.name.endsWith('.log'))
        .map((entry) => unlink(join(this.directory, entry.name))));
    });
    this.pending = clear.catch(() => {});
    return clear;
  }

  async listDates(): Promise<string[]> {
    await this.pending;
    let entries;
    try {
      entries = await readdir(this.directory, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.log'))
      .map((entry) => entry.name.slice(0, -4))
      .filter((date) => LOG_DATE_PATTERN.test(date))
      .sort()
      .reverse();
  }

  async read(date: string): Promise<{ entries: LogRecord[]; raw: string }> {
    validateLogDate(date);
    await this.pending;
    let raw: string;
    try {
      raw = await readFile(this.filePath(date), 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return { entries: [], raw: '' };
      }
      throw error;
    }
    const entries = raw
      .split('\n')
      .filter(Boolean)
      .map((line): LogRecord => {
        try {
          return sanitizeLogDetails(JSON.parse(line)) as LogRecord;
        } catch {
          return {
            level: 'error',
            message: 'This log line could not be parsed.',
            operation: 'log.parse',
            status: 'failed',
            timestamp: '',
          };
        }
      });
    const sanitizedRaw = entries.length === 0
      ? ''
      : `${entries.map((entry) => JSON.stringify(entry)).join('\n')}\n`;
    return { entries, raw: sanitizedRaw };
  }

  private async pruneExpired(now: Date): Promise<void> {
    const cutoff = new Date(now);
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (this.retentionDays - 1));
    const cutoffDate = localLogDate(cutoff);
    const entries = await readdir(this.directory, { withFileTypes: true });
    await Promise.all(entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.log'))
      .filter((entry) => {
        const date = entry.name.slice(0, -4);
        return LOG_DATE_PATTERN.test(date) && date < cutoffDate;
      })
      .map((entry) => unlink(join(this.directory, entry.name))));
  }
}
