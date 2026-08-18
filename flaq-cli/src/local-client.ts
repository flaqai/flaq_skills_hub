import { FlaqCliError } from './errors.ts';
import { SESSION_HEADER } from './constants.ts';
import { readLocalSession } from './runtime/session.ts';

interface LocalEnvelope<T> {
  data?: T;
  error?: {
    category?: string;
    code?: string;
    message?: string;
    retryable?: boolean;
    httpStatus?: number;
    businessCode?: string;
    details?: unknown;
  };
  ok: boolean;
}

export async function localRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const session = await readLocalSession();
  let response: Response;
  try {
    response = await fetch(`http://${session.host}:${session.port}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        [SESSION_HEADER]: session.token,
        ...init.headers,
      },
    });
  } catch (error) {
    throw new FlaqCliError({
      category: 'service',
      code: 'LOCAL_SERVICE_UNREACHABLE',
      message: error instanceof Error ? error.message : 'Flaq local service is unreachable.',
      retryable: false,
    });
  }

  let envelope: LocalEnvelope<T>;
  try {
    envelope = await response.json() as LocalEnvelope<T>;
  } catch {
    throw new FlaqCliError({
      category: 'service',
      code: 'INVALID_LOCAL_RESPONSE',
      message: `Flaq local service returned invalid JSON with HTTP ${response.status}.`,
      retryable: false,
    });
  }

  if (!response.ok || !envelope.ok || envelope.data === undefined) {
    throw new FlaqCliError({
      category: envelope.error?.category ?? 'service',
      code: envelope.error?.code ?? 'LOCAL_SERVICE_ERROR',
      message: envelope.error?.message ?? `Flaq local service failed with HTTP ${response.status}.`,
      retryable: envelope.error?.retryable ?? false,
      ...(envelope.error?.httpStatus === undefined ? {} : { httpStatus: envelope.error.httpStatus }),
      ...(envelope.error?.businessCode === undefined ? {} : { businessCode: envelope.error.businessCode }),
      ...(envelope.error?.details === undefined ? {} : { details: envelope.error.details }),
    });
  }

  return envelope.data;
}
