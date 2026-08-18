import { FlaqCliError } from '../errors.ts';

function isLoopbackHostname(hostname: string): boolean {
  return hostname === '127.0.0.1' || hostname === '::1' || hostname === 'localhost';
}

function parseUrl(
  value: string,
  field: string,
  errorCode: string,
  allowQuery: boolean,
  allowLoopbackHttp: boolean,
): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new FlaqCliError({
      category: 'request',
      code: errorCode,
      message: `${field} must be a valid absolute URL.`,
      retryable: false,
    });
  }

  if (url.username || url.password) {
    throw new FlaqCliError({
      category: 'request',
      code: errorCode,
      message: `${field} must not contain embedded credentials.`,
      retryable: false,
    });
  }
  if ((!allowQuery && url.search) || url.hash) {
    throw new FlaqCliError({
      category: 'request',
      code: errorCode,
      message: `${field} must not contain a query string or fragment.`,
      retryable: false,
    });
  }
  if (
    url.protocol !== 'https:' &&
    !(allowLoopbackHttp && url.protocol === 'http:' && isLoopbackHostname(url.hostname))
  ) {
    throw new FlaqCliError({
      category: 'request',
      code: errorCode,
      message: allowLoopbackHttp
        ? `${field} must use HTTPS. HTTP is allowed only for loopback development addresses.`
        : `${field} must use HTTPS.`,
      retryable: false,
    });
  }

  return url;
}

export function normalizeRemoteApiBaseUrl(value: string): string {
  const url = parseUrl(value, 'API base URL', 'INSECURE_API_BASE_URL', false, true);
  return url.toString().replace(/\/$/, '');
}

export function remoteApiOrigin(value: string): string {
  return new URL(normalizeRemoteApiBaseUrl(value)).origin;
}

export function normalizeRemoteResourceUrl(value: string, field: string): string {
  const url = parseUrl(value, field, 'INSECURE_REMOTE_RESOURCE_URL', true, false);
  return url.toString();
}
