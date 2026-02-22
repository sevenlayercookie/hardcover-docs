import { describe, expect, it } from 'vitest';
import fs from 'node:fs';

const postmanPath = '/home/runner/work/hardcover-docs/hardcover-docs/specs/hardcover-api.postman_collection.json';
const openapiPath = '/home/runner/work/hardcover-docs/hardcover-docs/specs/hardcover-api.openapi.yaml';

describe('API artifacts', () => {
  it('contains comprehensive Postman requests for queries and mutations', () => {
    const collection = JSON.parse(fs.readFileSync(postmanPath, 'utf8'));
    const queries = collection.item.find((item: { name: string }) => item.name === 'Queries');
    const mutations = collection.item.find((item: { name: string }) => item.name === 'Mutations');

    expect(queries).toBeTruthy();
    expect(mutations).toBeTruthy();
    expect(queries.item.length).toBeGreaterThan(100);
    expect(mutations.item.length).toBeGreaterThan(50);
  });

  it('contains comprehensive OpenAPI operation catalog metadata', () => {
    const openapiText = fs.readFileSync(openapiPath, 'utf8');

    expect(openapiText).toContain('x-graphql-operation-catalog:');
    expect(openapiText).toContain('queryCount: 134');
    expect(openapiText).toContain('mutationCount: 103');
  });
});
