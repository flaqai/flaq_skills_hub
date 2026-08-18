import type { MachineError } from './types.ts';

export class FlaqCliError extends Error {
  readonly machine: MachineError;

  constructor(machine: MachineError) {
    super(machine.message);
    this.name = 'FlaqCliError';
    this.machine = machine;
  }
}

const BUSINESS_ERROR_MAP: Record<string, Omit<MachineError, 'message' | 'businessCode' | 'httpStatus'>> = {
  '1000': { category: 'authentication', code: 'AUTHENTICATION_FAILED', retryable: false },
  '1001': { category: 'authentication', code: 'AUTHENTICATION_FAILED', retryable: false },
  '1002': { category: 'authentication', code: 'AUTHENTICATION_FAILED', retryable: false },
  '1003': { category: 'authentication', code: 'AUTHENTICATION_FAILED', retryable: false },
  '1004': { category: 'authentication', code: 'AUTHENTICATION_FAILED', retryable: false },
  '1005': { category: 'authentication', code: 'AUTHENTICATION_FAILED', retryable: false },
  '1100': { category: 'account', code: 'ACCOUNT_EXCEPTION', retryable: false },
  '1101': { category: 'billing', code: 'INSUFFICIENT_BALANCE', retryable: false },
  '1102': { category: 'billing', code: 'RESOURCE_PACKAGE_UNAVAILABLE', retryable: false },
  '1103': { category: 'permission', code: 'RESOURCE_PERMISSION_DENIED', retryable: false },
  '1104': { category: 'billing', code: 'CLIENT_KEY_CREDIT_LIMIT_EXCEEDED', retryable: false },
  '1200': { category: 'request', code: 'INVALID_REQUEST_PARAMETERS', retryable: false },
  '1201': { category: 'request', code: 'INVALID_PARAMETER', retryable: false },
  '1202': { category: 'request', code: 'INVALID_REQUEST_METHOD', retryable: false },
  '1203': { category: 'request', code: 'RESOURCE_NOT_FOUND', retryable: false },
  '1300': { category: 'policy', code: 'PLATFORM_POLICY_TRIGGERED', retryable: false },
  '1301': { category: 'policy', code: 'CONTENT_POLICY_TRIGGERED', retryable: false },
  '1302': { category: 'rate_limit', code: 'RATE_LIMIT_EXCEEDED', retryable: true },
  '1303': { category: 'rate_limit', code: 'CONCURRENCY_LIMIT_EXCEEDED', retryable: true },
  '5000': { category: 'server', code: 'SERVER_INTERNAL_ERROR', retryable: true },
  '5001': { category: 'server', code: 'SERVER_UNAVAILABLE', retryable: true },
  '5002': { category: 'server', code: 'SERVER_TIMEOUT', retryable: true },
};

const BUSINESS_ERROR_MESSAGES: Record<string, string> = {
  '1000': 'Flaq authentication failed.',
  '1001': 'The Client Key is invalid.',
  '1002': 'The Client Key is disabled.',
  '1003': 'The Client Key has expired.',
  '1004': 'The Client Key is not permitted to access this resource.',
  '1005': 'Flaq authentication failed.',
  '1100': 'The Flaq account is unavailable.',
  '1101': 'The Flaq account has insufficient balance.',
  '1102': 'The required resource package is unavailable.',
  '1103': 'The Client Key does not have permission for this resource.',
  '1104': 'The Client Key credit limit has been exceeded.',
  '1200': 'The Flaq API rejected the request parameters.',
  '1201': 'The Flaq API rejected one or more request parameters.',
  '1202': 'The Flaq API does not allow this request method.',
  '1203': 'The requested Flaq resource was not found.',
  '1300': 'The request triggered a platform policy.',
  '1301': 'The request triggered a content policy.',
  '1302': 'The Flaq API rate limit has been exceeded.',
  '1303': 'The Flaq API concurrency limit has been exceeded.',
  '5000': 'The Flaq API encountered an internal error.',
  '5001': 'The Flaq API is temporarily unavailable.',
  '5002': 'The Flaq API request timed out.',
};

const PUBLIC_DETAIL_CODES = new Set([
  'GENERATION_FAILED',
  'MODEL_CATALOG_INVALID',
  'MODEL_CATALOG_UNREADABLE',
  'MODEL_INPUT_INVALID',
]);

export type PublicMachineError = MachineError;

export function publicMachineError(machine: MachineError): PublicMachineError {
  return {
    category: machine.category,
    code: machine.code,
    message: machine.message,
    retryable: machine.retryable,
    ...(machine.httpStatus === undefined ? {} : { httpStatus: machine.httpStatus }),
    ...(machine.businessCode === undefined ? {} : { businessCode: machine.businessCode }),
    ...(machine.details === undefined || !PUBLIC_DETAIL_CODES.has(machine.code)
      ? {}
      : { details: machine.details }),
  };
}

export function classifyBusinessError(
  businessCode: number | string | undefined,
  _message: string,
  httpStatus?: number,
): FlaqCliError {
  const normalizedCode = businessCode === undefined ? undefined : String(businessCode);
  const mapped = normalizedCode ? BUSINESS_ERROR_MAP[normalizedCode] : undefined;
  const safeMessage = normalizedCode === undefined
    ? `The Flaq API request failed${httpStatus === undefined ? '.' : ` with HTTP ${httpStatus}.`}`
    : BUSINESS_ERROR_MESSAGES[normalizedCode] ?? 'The Flaq API rejected the request.';

  if (mapped && normalizedCode) {
    return new FlaqCliError({
      ...mapped,
      message: safeMessage,
      ...(httpStatus === undefined ? {} : { httpStatus }),
      businessCode: normalizedCode,
    });
  }

  if (httpStatus === 401) {
    return new FlaqCliError({
      category: 'authentication',
      code: 'AUTHENTICATION_FAILED',
      message: 'Flaq authentication failed.',
      retryable: false,
      httpStatus,
      ...(normalizedCode === undefined ? {} : { businessCode: normalizedCode }),
    });
  }

  return new FlaqCliError({
    category: httpStatus !== undefined && httpStatus >= 500 ? 'server' : 'unknown',
    code: 'FLAQ_API_ERROR',
    message: safeMessage,
    retryable: httpStatus !== undefined && httpStatus >= 500,
    ...(httpStatus === undefined ? {} : { httpStatus }),
    ...(normalizedCode === undefined ? {} : { businessCode: normalizedCode }),
  });
}

export function asFlaqCliError(error: unknown): FlaqCliError {
  if (error instanceof FlaqCliError) {
    return error;
  }

  return new FlaqCliError({
    category: 'internal',
    code: 'INTERNAL_ERROR',
    message: error instanceof Error ? error.message : 'Unknown internal error',
    retryable: false,
  });
}
