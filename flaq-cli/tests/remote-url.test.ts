import assert from 'node:assert/strict';
import test from 'node:test';

import { clientKeyCredentialIdentity } from '../src/auth/credential-store.ts';
import { FlaqCliError } from '../src/errors.ts';
import { normalizeRemoteApiBaseUrl, remoteApiOrigin } from '../src/security/remote-url.ts';

test('requires HTTPS for remote API base URLs and permits loopback HTTP', () => {
  assert.equal(normalizeRemoteApiBaseUrl('https://api.example.test/'), 'https://api.example.test');
  assert.equal(normalizeRemoteApiBaseUrl('http://127.0.0.1:8787'), 'http://127.0.0.1:8787');
  assert.throws(
    () => normalizeRemoteApiBaseUrl('http://api.example.test'),
    (error: unknown) => {
      assert.ok(error instanceof FlaqCliError);
      assert.equal(error.machine.code, 'INSECURE_API_BASE_URL');
      return true;
    },
  );
});

test('rejects API URLs containing credentials, query strings, or fragments', () => {
  assert.throws(() => normalizeRemoteApiBaseUrl('https://user:pass@api.example.test'));
  assert.throws(() => normalizeRemoteApiBaseUrl('https://api.example.test?token=secret'));
  assert.throws(() => normalizeRemoteApiBaseUrl('https://api.example.test#fragment'));
});

test('isolates Client Key entries by API origin', () => {
  const flaq = clientKeyCredentialIdentity('https://api.flaq.ai');
  const first = clientKeyCredentialIdentity('https://first.example.test/api');
  const firstAgain = clientKeyCredentialIdentity('https://first.example.test/other');
  const second = clientKeyCredentialIdentity('https://second.example.test/api');

  assert.equal(remoteApiOrigin('https://first.example.test/api'), 'https://first.example.test');
  assert.deepEqual(first, firstAgain);
  assert.notDeepEqual(first, second);
  assert.notDeepEqual(flaq, first);
});
