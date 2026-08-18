import assert from 'node:assert/strict';
import test from 'node:test';

import { classifyBusinessError, FlaqCliError, publicMachineError } from '../src/errors.ts';

test('classifies insufficient balance separately', () => {
  const error = classifyBusinessError(1101, 'Insufficient balance', 429);
  assert.equal(error.machine.category, 'billing');
  assert.equal(error.machine.code, 'INSUFFICIENT_BALANCE');
  assert.equal(error.machine.retryable, false);
});

test('marks server errors as retryable', () => {
  const error = classifyBusinessError(5001, 'Unavailable', 503);
  assert.equal(error.machine.code, 'SERVER_UNAVAILABLE');
  assert.equal(error.machine.retryable, true);
});

test('exposes only allowlisted local diagnostic details', () => {
  const localValidation = new FlaqCliError({
    category: 'request',
    code: 'MODEL_INPUT_INVALID',
    message: 'Invalid model input.',
    retryable: false,
    details: { errors: ['Missing prompt.'] },
  });
  const upstream = new FlaqCliError({
    category: 'server',
    code: 'SERVER_INTERNAL_ERROR',
    message: 'Server error.',
    retryable: true,
    details: { authorization: 'Bearer upstream-secret' },
  });

  assert.deepEqual(publicMachineError(localValidation.machine).details, { errors: ['Missing prompt.'] });
  assert.equal('details' in publicMachineError(upstream.machine), false);
});
