import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

import { loadModelCatalog, ModelCatalog } from '../src/catalog/catalog.ts';
import { FlaqCliError } from '../src/errors.ts';
import { modelCatalogDirectory } from '../src/runtime/paths.ts';

function incrementalConfig(schemaVersion = 1): Record<string, unknown> {
  return {
    schemaVersion,
    id: 'example-image',
    vendor: 'example',
    mediaType: 'image',
    operations: [
      {
        id: 'text-to-image',
        modelName: 'example-image-v1',
        requiredFields: ['prompt'],
        optionalFields: [],
        prohibitedFields: ['image_url'],
        fields: {
          prompt: { type: 'string', minLength: 1 },
        },
      },
    ],
  };
}

test('loads the first three model files without a central index', async () => {
  const snapshot = await loadModelCatalog(modelCatalogDirectory());
  assert.deepEqual(
    snapshot.models.map((model) => [model.id, model.operations.length]),
    [['gpt-image-2', 2], ['seedance-2-0', 6], ['seedance-2-5', 3]],
  );
});

test('validates task input against the selected backend model operation', async () => {
  const catalog = await ModelCatalog.create(modelCatalogDirectory());
  const operation = catalog.validateTaskInput('image', {
    model_name: 'gpt-image-2',
    prompt: 'A clean product photograph',
    width: 16,
    height: 9,
    resolution: '1k',
    quality: 'medium',
  });
  assert.equal(operation.id, 'text-to-image');

  const localMediaOperation = catalog.validateTaskInput('image', {
    model_name: 'gpt-image-2-edit',
    prompt: 'Use a local reference',
    image_url_list: ['/absolute/path/reference.png'],
  });
  assert.equal(localMediaOperation.id, 'image-to-image');

  assert.throws(
    () => catalog.validateTaskInput('image', {
      model_name: 'gpt-image-2-edit',
      prompt: 'Reject a relative path',
      image_url_list: ['relative/reference.png'],
    }),
    (error: unknown) => error instanceof FlaqCliError && error.machine.code === 'MODEL_INPUT_INVALID',
  );

  assert.throws(
    () => catalog.validateTaskInput('video', {
      model_name: 'seedance-v2.5-image-to-video',
      prompt: 'Camera pulls back',
      resolution: '720p',
      duration: 8,
      aspect_ratio: '16:9',
      image_url: 'https://example.com/frame.jpg',
    }),
    (error: unknown) => error instanceof FlaqCliError && error.machine.code === 'MODEL_INPUT_INVALID',
  );

  assert.throws(
    () => catalog.validateTaskInput('video', {
      model_name: 'seedance-v2.0-reference-to-video',
      prompt: 'Follow the reference',
      duration: 8,
      resolution: '720p',
      aspect_ratio: '16:9',
      images: [],
      videos: [],
    }),
    (error: unknown) => error instanceof FlaqCliError && error.machine.code === 'MODEL_INPUT_INVALID',
  );
});

test('enforces the approved prompt limits for image and video models', async () => {
  const catalog = await ModelCatalog.create(modelCatalogDirectory());

  assert.throws(
    () => catalog.validateTaskInput('image', {
      model_name: 'gpt-image-2',
      prompt: 'x'.repeat(2001),
      width: 16,
      height: 9,
      resolution: '1k',
      quality: 'medium',
    }),
    (error: unknown) => error instanceof FlaqCliError && error.machine.code === 'MODEL_INPUT_INVALID',
  );

  assert.throws(
    () => catalog.validateTaskInput('video', {
      model_name: 'seedance-v2.5-text-to-video',
      prompt: 'x'.repeat(5001),
      resolution: '720p',
      duration: 8,
      aspect_ratio: '16:9',
    }),
    (error: unknown) => error instanceof FlaqCliError && error.machine.code === 'MODEL_INPUT_INVALID',
  );
});

test('discovers an incremental JSON and keeps the previous snapshot after a failed reload', async () => {
  const directory = await mkdtemp(join(process.cwd(), '.flaq-cli-catalog-test-'));
  const vendorDirectory = join(directory, 'example');
  const configPath = join(vendorDirectory, 'example-image.json');
  try {
    await mkdir(vendorDirectory);
    await writeFile(configPath, `${JSON.stringify(incrementalConfig())}\n`);
    const catalog = await ModelCatalog.create(directory);
    assert.deepEqual(catalog.list().map((model) => model.id), ['example-image']);

    await writeFile(configPath, `${JSON.stringify(incrementalConfig(99))}\n`);
    await assert.rejects(
      () => catalog.reload(),
      (error: unknown) => error instanceof FlaqCliError && error.machine.code === 'MODEL_CATALOG_INVALID',
    );
    assert.deepEqual(catalog.list().map((model) => model.id), ['example-image']);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
