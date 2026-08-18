import type { MediaType } from '../types.ts';

export type ModelFieldType = 'boolean' | 'number' | 'string' | 'string-array';

export interface MediaResourceLimits {
  extensions?: string[];
  itemDurationSeconds?: { min: number; max: number };
  maxItemBytes?: number;
  totalDurationSeconds?: { max: number };
}

export interface ModelFieldRule {
  default?: boolean | number | string | string[];
  format?: 'http-url' | 'media-input';
  maxItems?: number;
  maxLength?: number;
  maximum?: number;
  minItems?: number;
  minLength?: number;
  minimum?: number;
  resourceLimits?: MediaResourceLimits;
  type: ModelFieldType;
  values?: Array<boolean | number | string>;
}

export interface ModelOperationConstraints {
  allowedPairs?: Array<{
    fields: [string, string];
    values: Array<[number, number]>;
  }>;
  allOrNone?: string[][];
  atLeastOne?: string[][];
}

export interface ModelOperationConfig {
  constraints?: ModelOperationConstraints;
  fields: Record<string, ModelFieldRule>;
  id: string;
  modelName: string;
  optionalFields: string[];
  prohibitedFields: string[];
  requiredFields: string[];
}

export interface ModelConfig {
  id: string;
  mediaType: MediaType;
  operations: ModelOperationConfig[];
  schemaVersion: number;
  vendor: string;
}

export interface ModelSummary {
  id: string;
  mediaType: MediaType;
  operations: Array<{ id: string; modelName: string }>;
  vendor: string;
}

export interface CatalogSnapshot {
  directory: string;
  loadedAt: string;
  models: ModelConfig[];
  schemaVersion: number;
}
