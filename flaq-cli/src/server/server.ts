import { spawn } from 'node:child_process';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

import { FlaqApiClient, type FetchImplementation } from '../api/client.ts';
import { TaskRunner } from '../api/task-runner.ts';
import type { CredentialStore } from '../auth/credential-store.ts';
import { ModelCatalog } from '../catalog/catalog.ts';
import {
  APP_NAME,
  APP_VERSION,
  DEFAULT_API_BASE_URL,
  DEFAULT_HOST,
  DEFAULT_PORT,
  SESSION_COOKIE,
  SESSION_HEADER,
} from '../constants.ts';
import { downloadTaskResults } from '../download.ts';
import { asFlaqCliError, FlaqCliError, publicMachineError } from '../errors.ts';
import {
  clearLocalSession,
  createSessionToken,
  safeTokenEquals,
  writeLocalSession,
} from '../runtime/session.ts';
import { modelCatalogDirectory } from '../runtime/paths.ts';
import { DailyLogger } from '../runtime/logger.ts';
import { normalizeRemoteApiBaseUrl, remoteApiOrigin } from '../security/remote-url.ts';
import type { MediaType } from '../types.ts';
import { renderManagementPage } from '../ui/management-page.ts';

const MAX_REQUEST_BYTES = 2 * 1024 * 1024;

interface StartServerOptions {
  apiFetchImplementation?: FetchImplementation;
  apiBaseUrl?: string;
  catalogDirectory?: string;
  credentialStore: CredentialStore;
  host?: string;
  logger?: DailyLogger;
  openManagementPage?: boolean;
  port?: number;
}

interface RunningServer {
  bootstrapUrl: string;
  close(): Promise<void>;
  host: string;
  port: number;
  url: string;
}

interface TaskRequestBody {
  confirmed?: boolean;
  input?: Record<string, unknown>;
  mediaType?: MediaType;
  outputDirectory?: string;
  taskId?: string;
}

function isMediaType(value: unknown): value is MediaType {
  return value === 'image' || value === 'video';
}

function statusForError(error: FlaqCliError): number {
  if (error.machine.httpStatus) {
    return error.machine.httpStatus;
  }
  if (error.machine.category === 'authentication') {
    return 401;
  }
  if (error.machine.category === 'request' || error.machine.category === 'protocol') {
    return 400;
  }
  if (error.machine.category === 'approval') {
    return 409;
  }
  return 500;
}

function writeJson(response: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}): void {
  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  response.end(`${JSON.stringify(body)}\n`);
}

function writeHtml(response: ServerResponse, body: string): void {
  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'self'; connect-src 'self'; img-src 'self' data:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
    'Content-Type': 'text/html; charset=utf-8',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  });
  response.end(body);
}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    receivedBytes += buffer.length;
    if (receivedBytes > MAX_REQUEST_BYTES) {
      throw new FlaqCliError({
        category: 'request',
        code: 'REQUEST_BODY_TOO_LARGE',
        message: `Local request body exceeds ${MAX_REQUEST_BYTES} bytes.`,
        retryable: false,
      });
    }
    chunks.push(buffer);
  }

  if (chunks.length === 0) {
    return {};
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_JSON_BODY',
      message: 'Local request body must be valid JSON.',
      retryable: false,
    });
  }
}

function requestToken(request: IncomingMessage): string | undefined {
  const headerToken = request.headers[SESSION_HEADER];
  if (typeof headerToken === 'string') {
    return headerToken;
  }
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) {
    return undefined;
  }
  for (const cookie of cookieHeader.split(';')) {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (name === SESSION_COOKIE) {
      return decodeURIComponent(valueParts.join('='));
    }
  }
  return undefined;
}

function requireSession(request: IncomingMessage, sessionToken: string): void {
  if (!safeTokenEquals(requestToken(request), sessionToken)) {
    throw new FlaqCliError({
      category: 'authentication',
      code: 'LOCAL_SESSION_REQUIRED',
      message: 'A valid Flaq local session is required.',
      retryable: false,
    });
  }
}

function verifyBrowserOrigin(request: IncomingMessage, origin: string): void {
  const requestOrigin = request.headers.origin;
  if (requestOrigin && requestOrigin !== origin) {
    throw new FlaqCliError({
      category: 'authentication',
      code: 'LOCAL_ORIGIN_REJECTED',
      message: 'The local request origin is not allowed.',
      retryable: false,
    });
  }
}

function validateTaskBody(body: unknown, requireInput: boolean): TaskRequestBody {
  if (!body || typeof body !== 'object') {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_TASK_REQUEST',
      message: 'Task request body must be an object.',
      retryable: false,
    });
  }
  const requestBody = body as TaskRequestBody;
  if (!isMediaType(requestBody.mediaType)) {
    throw new FlaqCliError({
      category: 'request',
      code: 'INVALID_MEDIA_TYPE',
      message: 'mediaType must be image or video.',
      retryable: false,
    });
  }
  if (requireInput && (!requestBody.input || typeof requestBody.input !== 'object')) {
    throw new FlaqCliError({
      category: 'request',
      code: 'TASK_INPUT_REQUIRED',
      message: 'Task input is required.',
      retryable: false,
    });
  }
  return requestBody;
}

function requirePaidActionConfirmation(body: TaskRequestBody): void {
  if (body.confirmed !== true) {
    throw new FlaqCliError({
      category: 'approval',
      code: 'GENERATION_CONFIRMATION_REQUIRED',
      message: 'Paid generation requires confirmed: true after user approval.',
      retryable: false,
    });
  }
}

export async function startServer(options: StartServerOptions): Promise<RunningServer> {
  const host = options.host ?? DEFAULT_HOST;
  const port = options.port ?? DEFAULT_PORT;
  if (host !== '127.0.0.1' && host !== '::1') {
    throw new FlaqCliError({
      category: 'service',
      code: 'NON_LOOPBACK_HOST_REJECTED',
      message: 'Flaq local service may only listen on a loopback address.',
      retryable: false,
    });
  }

  const origin = `http://${host}:${port}`;
  const apiBaseUrl = normalizeRemoteApiBaseUrl(options.apiBaseUrl ?? DEFAULT_API_BASE_URL);
  const credentialOrigin = remoteApiOrigin(apiBaseUrl);
  const logger = options.logger ?? new DailyLogger();
  const sessionToken = createSessionToken();
  const bootstrapToken = createSessionToken();
  let bootstrapAvailable = true;
  const modelCatalog = await ModelCatalog.create(options.catalogDirectory ?? modelCatalogDirectory());
  const apiClient = new FlaqApiClient({
    baseUrl: apiBaseUrl,
    getClientKey: () => options.credentialStore.get(),
    ...(options.apiFetchImplementation === undefined
      ? {}
      : { fetchImplementation: options.apiFetchImplementation }),
  });
  const taskRunner = new TaskRunner(apiClient, { downloadResults: downloadTaskResults });

  const server = createServer(async (request, response) => {
    const requestStartedAt = Date.now();
    let requestDetails: Record<string, unknown> = {};
    let requestOperation = 'local.request';
    let requestError: unknown;
    let skipRequestLog = false;
    try {
      const url = new URL(request.url ?? '/', origin);
      requestOperation = `${request.method ?? 'UNKNOWN'} ${url.pathname}`;
      requestDetails = { method: request.method ?? 'UNKNOWN', path: url.pathname };
      response.once('finish', () => {
        if (skipRequestLog) {
          return;
        }
        const failed = response.statusCode >= 400;
        void logger.write({
          details: {
            ...requestDetails,
            httpStatus: response.statusCode,
            ...(requestError === undefined ? {} : { error: requestError }),
          },
          durationMs: Date.now() - requestStartedAt,
          level: failed ? 'error' : 'info',
          operation: requestOperation,
          status: failed ? 'failed' : 'succeeded',
        }).catch(() => {});
      });

      if (
        request.method === 'GET' &&
        url.pathname === '/' &&
        bootstrapAvailable &&
        safeTokenEquals(url.searchParams.get('bootstrap') ?? undefined, bootstrapToken)
      ) {
        skipRequestLog = true;
        bootstrapAvailable = false;
        response.writeHead(303, {
          'Cache-Control': 'no-store',
          Location: '/',
          'Referrer-Policy': 'no-referrer',
          'Set-Cookie': `${SESSION_COOKIE}=${encodeURIComponent(sessionToken)}; HttpOnly; SameSite=Strict; Path=/`,
        });
        response.end();
        return;
      }

      requireSession(request, sessionToken);
      verifyBrowserOrigin(request, origin);

      if (request.method === 'GET' && url.pathname === '/health') {
        requestOperation = 'service.status';
        writeJson(response, 200, {
          ok: true,
          data: {
            name: APP_NAME,
            version: APP_VERSION,
            host,
            port,
            authConfigured: await options.credentialStore.has(),
            modelCount: modelCatalog.list().length,
            modelCatalogLoadedAt: modelCatalog.snapshot().loadedAt,
          },
        });
        return;
      }

      if (request.method === 'GET' && url.pathname === '/') {
        skipRequestLog = true;
        writeHtml(response, renderManagementPage());
        return;
      }

      if (request.method === 'GET' && url.pathname === '/api/logs/dates') {
        skipRequestLog = true;
        writeJson(response, 200, {
          ok: true,
          data: {
            currentDate: logger.currentDate(),
            dates: await logger.listDates(),
            directory: logger.directory,
            retentionDays: logger.retentionDays,
          },
        });
        return;
      }

      if (request.method === 'GET' && url.pathname === '/api/logs') {
        skipRequestLog = true;
        const date = url.searchParams.get('date') ?? logger.currentDate();
        const log = await logger.read(date);
        writeJson(response, 200, {
          ok: true,
          data: {
            date,
            directory: logger.directory,
            entries: log.entries,
            raw: log.raw,
          },
        });
        return;
      }

      if (request.method === 'DELETE' && url.pathname === '/api/logs') {
        skipRequestLog = true;
        const date = url.searchParams.get('date');
        if (!date) {
          throw new FlaqCliError({
            category: 'request',
            code: 'LOG_DATE_REQUIRED',
            message: 'A log date is required.',
            retryable: false,
          });
        }
        await logger.clear(date);
        writeJson(response, 200, { ok: true, data: { cleared: true, date } });
        return;
      }

      if (request.method === 'DELETE' && url.pathname === '/api/logs/all') {
        skipRequestLog = true;
        await logger.clearAll();
        writeJson(response, 200, { ok: true, data: { cleared: true } });
        return;
      }

      if (request.method === 'GET' && url.pathname === '/api/auth/status') {
        requestOperation = 'auth.status';
        writeJson(response, 200, {
          ok: true,
          data: {
            apiBaseUrl,
            configured: await options.credentialStore.has(),
            credentialOrigin,
            remoteValidation: 'unavailable',
            storage: 'macos-keychain',
          },
        });
        return;
      }

      if (request.method === 'PUT' && url.pathname === '/api/auth/key') {
        requestOperation = 'auth.client-key.save';
        const body = await readJsonBody(request) as { clientKey?: unknown };
        if (typeof body.clientKey !== 'string') {
          throw new FlaqCliError({
            category: 'request',
            code: 'CLIENT_KEY_REQUIRED',
            message: 'clientKey must be a string.',
            retryable: false,
          });
        }
        await options.credentialStore.set(body.clientKey);
        writeJson(response, 200, { ok: true, data: { configured: true } });
        return;
      }

      if (request.method === 'DELETE' && url.pathname === '/api/auth/key') {
        requestOperation = 'auth.client-key.clear';
        await options.credentialStore.clear();
        writeJson(response, 200, { ok: true, data: { configured: false } });
        return;
      }

      if (request.method === 'GET' && url.pathname === '/api/models') {
        requestOperation = 'models.list';
        const snapshot = modelCatalog.snapshot();
        writeJson(response, 200, {
          ok: true,
          data: {
            loadedAt: snapshot.loadedAt,
            models: modelCatalog.list(),
            schemaVersion: snapshot.schemaVersion,
          },
        });
        return;
      }

      if (request.method === 'GET' && url.pathname.startsWith('/api/models/')) {
        const modelId = decodeURIComponent(url.pathname.slice('/api/models/'.length));
        requestOperation = 'models.get';
        requestDetails = { ...requestDetails, modelId };
        writeJson(response, 200, { ok: true, data: modelCatalog.get(modelId) });
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/models/reload') {
        requestOperation = 'models.reload';
        const snapshot = await modelCatalog.reload();
        requestDetails = { ...requestDetails, modelCount: snapshot.models.length };
        writeJson(response, 200, {
          ok: true,
          data: {
            loadedAt: snapshot.loadedAt,
            modelCount: snapshot.models.length,
            schemaVersion: snapshot.schemaVersion,
          },
        });
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/tasks/submit') {
        requestOperation = 'task.submit';
        const body = validateTaskBody(await readJsonBody(request), true);
        requestDetails = {
          ...requestDetails,
          input: body.input,
          mediaType: body.mediaType,
        };
        const operation = modelCatalog.validateTaskInput(body.mediaType as MediaType, body.input as Record<string, unknown>);
        requirePaidActionConfirmation(body);
        const task = await apiClient.submitTask(body.mediaType as MediaType, body.input as Record<string, unknown>, operation);
        requestDetails = {
          ...requestDetails,
          taskId: task.task_id,
          taskStatus: task.task_status,
        };
        writeJson(response, 200, { ok: true, data: task });
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/tasks/get') {
        requestOperation = 'task.get';
        const body = validateTaskBody(await readJsonBody(request), false);
        if (typeof body.taskId !== 'string' || !body.taskId) {
          throw new FlaqCliError({
            category: 'request',
            code: 'TASK_ID_REQUIRED',
            message: 'taskId is required.',
            retryable: false,
          });
        }
        requestDetails = {
          ...requestDetails,
          mediaType: body.mediaType,
          taskId: body.taskId,
        };
        const task = await apiClient.getTask(body.mediaType as MediaType, body.taskId);
        requestDetails = { ...requestDetails, taskStatus: task.task_status };
        writeJson(response, 200, { ok: true, data: task });
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/tasks/wait') {
        requestOperation = 'task.wait';
        const body = validateTaskBody(await readJsonBody(request), false);
        if (typeof body.taskId !== 'string' || !body.taskId) {
          throw new FlaqCliError({
            category: 'request',
            code: 'TASK_ID_REQUIRED',
            message: 'taskId is required.',
            retryable: false,
          });
        }
        requestDetails = {
          ...requestDetails,
          mediaType: body.mediaType,
          taskId: body.taskId,
        };
        const task = await taskRunner.waitForCompletion(body.mediaType as MediaType, body.taskId);
        requestDetails = { ...requestDetails, taskStatus: task.task_status };
        writeJson(response, 200, { ok: true, data: task });
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/tasks/download') {
        requestOperation = 'task.download';
        const body = validateTaskBody(await readJsonBody(request), false);
        if (typeof body.taskId !== 'string' || !body.taskId) {
          throw new FlaqCliError({
            category: 'request',
            code: 'TASK_ID_REQUIRED',
            message: 'taskId is required.',
            retryable: false,
          });
        }
        if (typeof body.outputDirectory !== 'string' || !body.outputDirectory) {
          throw new FlaqCliError({
            category: 'request',
            code: 'OUTPUT_DIRECTORY_REQUIRED',
            message: 'outputDirectory is required.',
            retryable: false,
          });
        }
        requestDetails = {
          ...requestDetails,
          mediaType: body.mediaType,
          outputDirectory: body.outputDirectory,
          taskId: body.taskId,
        };
        const result = await taskRunner.downloadCompletedResults(
          body.mediaType as MediaType,
          body.taskId,
          body.outputDirectory,
        );
        requestDetails = {
          ...requestDetails,
          downloadCount: result.downloads.length,
          taskStatus: result.task.task_status,
        };
        writeJson(response, 200, { ok: true, data: result });
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/tasks/run') {
        requestOperation = 'task.run';
        const body = validateTaskBody(await readJsonBody(request), true);
        requestDetails = {
          ...requestDetails,
          input: body.input,
          mediaType: body.mediaType,
          outputDirectory: body.outputDirectory,
        };
        const operation = modelCatalog.validateTaskInput(body.mediaType as MediaType, body.input as Record<string, unknown>);
        requirePaidActionConfirmation(body);
        const result = await taskRunner.run(
          body.mediaType as MediaType,
          body.input as Record<string, unknown>,
          body.outputDirectory,
          {},
          operation,
        );
        requestDetails = {
          ...requestDetails,
          downloadCount: result.downloads.length,
          taskId: result.task.task_id,
          taskStatus: result.task.task_status,
        };
        writeJson(response, 200, { ok: true, data: result });
        return;
      }

      writeJson(response, 404, {
        ok: false,
        error: {
          category: 'request',
          code: 'LOCAL_ROUTE_NOT_FOUND',
          message: 'Local route not found.',
          retryable: false,
        },
      });
    } catch (error) {
      const flaqError = asFlaqCliError(error);
      const safeError = publicMachineError(flaqError.machine);
      requestError = safeError;
      writeJson(response, statusForError(flaqError), { ok: false, error: safeError });
    }
  });

  await listen(server, host, port);
  try {
    await writeLocalSession({
      host,
      port,
      pid: process.pid,
      startedAt: new Date().toISOString(),
      token: sessionToken,
    });
  } catch (error) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    throw error;
  }
  await logger.write({
    details: {
      apiOrigin: credentialOrigin,
      host,
      modelCount: modelCatalog.list().length,
      port,
      version: APP_VERSION,
    },
    operation: 'service.start',
    status: 'succeeded',
  }).catch(() => {});

  let closed = false;
  async function close(): Promise<void> {
    if (closed) {
      return;
    }
    closed = true;
    process.off('SIGINT', shutdown);
    process.off('SIGTERM', shutdown);
    await logger.write({
      details: { host, port },
      operation: 'service.stop',
      status: 'succeeded',
    }).catch(() => {});
    await new Promise<void>((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
    await clearLocalSession(sessionToken);
  }
  const shutdown = () => {
    void close().finally(() => process.exit(0));
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);

  const bootstrapUrl = `${origin}/?bootstrap=${encodeURIComponent(bootstrapToken)}`;
  if (options.openManagementPage) {
    const openProcess = spawn('/usr/bin/open', [bootstrapUrl], { detached: true, stdio: 'ignore' });
    openProcess.unref();
  }

  return { bootstrapUrl, close, host, port, url: origin };
}

function listen(server: Server, host: string, port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const onError = (error: NodeJS.ErrnoException) => {
      server.off('listening', onListening);
      if (error.code === 'EADDRINUSE') {
        reject(new FlaqCliError({
          category: 'service',
          code: 'LOCAL_SERVICE_ALREADY_RUNNING_OR_PORT_IN_USE',
          message: `Port ${port} is already in use.`,
          retryable: false,
        }));
        return;
      }
      reject(error);
    };
    const onListening = () => {
      server.off('error', onError);
      resolve();
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port, host);
  });
}
