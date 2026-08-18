export type MediaType = 'image' | 'video';

export type TaskStatus = 'submitted' | 'processing' | 'succeed' | 'failed';

export interface TaskResultItem {
  url?: string;
  [key: string]: unknown;
}

export interface TaskResult {
  images?: TaskResultItem[];
  videos?: TaskResultItem[];
  [key: string]: unknown;
}

export interface TaskData {
  task_id: string;
  task_status: TaskStatus;
  task_status_msg?: string | null;
  response_url?: string;
  task_result?: TaskResult | null;
}

export interface TaskResponse {
  code: number | string;
  message: string;
  data: TaskData | null;
}

export interface DownloadedFile {
  remoteUrl: string;
  localPath: string;
  bytes: number;
}

export interface RunTaskResult {
  task: TaskData;
  downloads: DownloadedFile[];
}

export interface MachineError {
  category: string;
  code: string;
  message: string;
  retryable: boolean;
  httpStatus?: number;
  businessCode?: string;
  details?: unknown;
}
