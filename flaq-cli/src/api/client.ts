import { DEFAULT_API_BASE_URL } from '../constants.ts';
import type { ModelOperationConfig } from '../catalog/types.ts';
import { classifyBusinessError, FlaqCliError } from '../errors.ts';
import { normalizeRemoteApiBaseUrl } from '../security/remote-url.ts';
import type { MediaType, TaskData, TaskResponse } from '../types.ts';
import { prepareTaskRequest } from './task-request.ts';

export type FetchImplementation = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export interface FlaqApiClientOptions {
  baseUrl?: string;
  fetchImplementation?: FetchImplementation;
  getClientKey: () => Promise<string | null>;
}

interface ApiBody {
  code?: number | string;
  data?: unknown;
  message?: string;
}

function endpointFor(mediaType: MediaType, taskId?: string): string {
  const encodedTaskId = taskId === undefined ? undefined : encodeURIComponent(taskId);
  return encodedTaskId === undefined
    ? `/api/v1/${mediaType}/task`
    : `/api/v1/${mediaType}/${encodedTaskId}`;
}

function isTaskStatus(value: unknown): value is TaskData['task_status'] {
  return value === 'submitted' || value === 'processing' || value === 'succeed' || value === 'failed';
}

function parseTaskResponse(body: unknown): TaskResponse {
  if (!body || typeof body !== 'object') {
    throw new FlaqCliError({
      category: 'protocol',
      code: 'INVALID_API_RESPONSE',
      message: 'Flaq API returned a non-object response.',
      retryable: false,
    });
  }

  const response = body as ApiBody;
  const code = response.code ?? 'UNKNOWN';
  const message = typeof response.message === 'string' ? response.message : 'Flaq API response';

  if (String(code) !== '0') {
    throw classifyBusinessError(code, message);
  }

  if (!response.data || typeof response.data !== 'object') {
    throw new FlaqCliError({
      category: 'protocol',
      code: 'MISSING_TASK_DATA',
      message: 'Flaq API response does not contain task data.',
      retryable: false,
    });
  }

  const data = response.data as Partial<TaskData>;
  if (typeof data.task_id !== 'string' || !data.task_id || !isTaskStatus(data.task_status)) {
    throw new FlaqCliError({
      category: 'protocol',
      code: 'INVALID_TASK_DATA',
      message: 'Flaq API response contains invalid task data.',
      retryable: false,
    });
  }

  const taskData = data as TaskData;
  const { task_status_msg: _upstreamStatusMessage, ...taskWithoutStatusMessage } = taskData;
  return {
    code,
    message,
    data: taskData.task_status === 'failed'
      ? { ...taskWithoutStatusMessage, task_status_msg: 'Generation failed. Review the task in Flaq for provider details.' }
      : taskWithoutStatusMessage as TaskData,
  };
}

export class FlaqApiClient {
  private readonly baseUrl: string;
  private readonly fetchImplementation: FetchImplementation;
  private readonly getClientKey: () => Promise<string | null>;

  constructor(options: FlaqApiClientOptions) {
    this.baseUrl = normalizeRemoteApiBaseUrl(options.baseUrl ?? DEFAULT_API_BASE_URL);
    this.fetchImplementation = options.fetchImplementation ?? fetch;
    this.getClientKey = options.getClientKey;
  }

  async getTask(mediaType: MediaType, taskId: string): Promise<TaskData> {
    const response = await this.request(endpointFor(mediaType, taskId), { method: 'GET' });
    return parseTaskResponse(response).data as TaskData;
  }

  async submitTask(
    mediaType: MediaType,
    input: Record<string, unknown>,
    operation?: ModelOperationConfig,
  ): Promise<TaskData> {
    if (typeof input.model_name !== 'string' || !input.model_name) {
      throw new FlaqCliError({
        category: 'request',
        code: 'MODEL_NAME_REQUIRED',
        message: 'The task input must contain a non-empty model_name.',
        retryable: false,
      });
    }

    const preparedRequest = await prepareTaskRequest(input, operation);
    const response = await this.request(endpointFor(mediaType), {
      method: 'POST',
      body: preparedRequest.body,
      headers: preparedRequest.multipart ? {} : { 'Content-Type': 'application/json' },
    });
    return parseTaskResponse(response).data as TaskData;
  }

  private async request(endpoint: string, init: RequestInit): Promise<unknown> {
    const clientKey = await this.getClientKey();
    if (!clientKey) {
      throw new FlaqCliError({
        category: 'authentication',
        code: 'CLIENT_KEY_NOT_CONFIGURED',
        message: 'Client Key is not configured.',
        retryable: false,
      });
    }

    let response: Response;
    try {
      response = await this.fetchImplementation(`${this.baseUrl}${endpoint}`, {
        ...init,
        redirect: 'error',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clientKey}`,
          ...init.headers,
        },
      });
    } catch (error) {
      throw new FlaqCliError({
        category: 'network',
        code: 'NETWORK_REQUEST_FAILED',
        message: 'The Flaq API request could not be completed.',
        retryable: true,
      });
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      throw new FlaqCliError({
        category: 'protocol',
        code: 'INVALID_JSON_RESPONSE',
        message: `Flaq API returned invalid JSON with HTTP ${response.status}.`,
        retryable: response.status >= 500,
        httpStatus: response.status,
      });
    }

    if (!response.ok) {
      const errorBody = body && typeof body === 'object' ? body as ApiBody : undefined;
      throw classifyBusinessError(
        errorBody?.code,
        errorBody?.message ?? response.statusText ?? `HTTP ${response.status}`,
        response.status,
      );
    }

    return body;
  }
}
