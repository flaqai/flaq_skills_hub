import { FlaqCliError } from '../errors.ts';
import type { ModelOperationConfig } from '../catalog/types.ts';
import type { DownloadedFile, MediaType, RunTaskResult, TaskData } from '../types.ts';
import type { FlaqApiClient } from './client.ts';

export interface TaskRunnerOptions {
  downloadResults?: (mediaType: MediaType, task: TaskData, outputDirectory: string) => Promise<DownloadedFile[]>;
  pollIntervalMs?: number;
  timeoutMs?: number;
}

export interface WaitOptions {
  signal?: AbortSignal;
}

function wait(durationMs: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, durationMs);
    const onAbort = () => {
      clearTimeout(timeout);
      reject(new FlaqCliError({
        category: 'task',
        code: 'TASK_WAIT_CANCELLED',
        message: 'Task polling was cancelled.',
        retryable: false,
      }));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

export class TaskRunner {
  private readonly apiClient: FlaqApiClient;
  private readonly downloadResults?: TaskRunnerOptions['downloadResults'];
  private readonly pollIntervalMs: number;
  private readonly timeoutMs: number;

  constructor(apiClient: FlaqApiClient, options: TaskRunnerOptions = {}) {
    this.apiClient = apiClient;
    this.downloadResults = options.downloadResults;
    this.pollIntervalMs = options.pollIntervalMs ?? 10_000;
    this.timeoutMs = options.timeoutMs ?? 30 * 60_000;
  }

  async run(
    mediaType: MediaType,
    input: Record<string, unknown>,
    outputDirectory?: string,
    options: WaitOptions = {},
    operation?: ModelOperationConfig,
  ): Promise<RunTaskResult> {
    const submittedTask = await this.apiClient.submitTask(mediaType, input, operation);
    const task = await this.waitForCompletion(mediaType, submittedTask.task_id, options);
    const downloads = outputDirectory && this.downloadResults
      ? await this.downloadResults(mediaType, task, outputDirectory)
      : [];

    return { task, downloads };
  }

  async downloadCompletedResults(
    mediaType: MediaType,
    taskId: string,
    outputDirectory: string,
  ): Promise<RunTaskResult> {
    const task = await this.apiClient.getTask(mediaType, taskId);
    if (task.task_status !== 'succeed') {
      throw new FlaqCliError({
        category: 'task',
        code: 'TASK_NOT_COMPLETE',
        message: `Task ${taskId} is ${task.task_status}; only completed tasks can be downloaded.`,
        retryable: task.task_status === 'submitted' || task.task_status === 'processing',
      });
    }
    if (!this.downloadResults) {
      throw new FlaqCliError({
        category: 'download',
        code: 'RESULT_DOWNLOADER_UNAVAILABLE',
        message: 'Result downloading is not configured.',
        retryable: false,
      });
    }
    const downloads = await this.downloadResults(mediaType, task, outputDirectory);
    return { task, downloads };
  }

  async waitForCompletion(
    mediaType: MediaType,
    taskId: string,
    options: WaitOptions = {},
  ): Promise<TaskData> {
    const startedAt = Date.now();

    while (true) {
      if (Date.now() - startedAt >= this.timeoutMs) {
        throw new FlaqCliError({
          category: 'task',
          code: 'TASK_POLL_TIMEOUT',
          message: `Task ${taskId} did not complete before the polling timeout.`,
          retryable: true,
        });
      }

      const task = await this.apiClient.getTask(mediaType, taskId);
      if (task.task_status === 'succeed') {
        return task;
      }
      if (task.task_status === 'failed') {
        throw new FlaqCliError({
          category: 'generation',
          code: 'GENERATION_FAILED',
          message: `Task ${taskId} failed. Review the task in Flaq for provider details.`,
          retryable: false,
          details: { mediaType, taskId },
        });
      }

      await wait(this.pollIntervalMs, options.signal);
    }
  }
}
