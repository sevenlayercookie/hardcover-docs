import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const QUERY_COUNT = 134;
const MUTATION_COUNT = 103;
const postmanPath = path.resolve(process.cwd(), 'specs/hardcover-api.postman_collection.json');
const openapiPath = path.resolve(process.cwd(), 'specs/hardcover-api.openapi.yaml');

describe('API artifacts', () => {
  it('contains comprehensive Postman requests for queries and mutations', () => {
    const collection = JSON.parse(fs.readFileSync(postmanPath, 'utf8'));
    const queries = collection.item.find((item: { name: string }) => item.name === 'Queries');
    const mutations = collection.item.find((item: { name: string }) => item.name === 'Mutations');

    expect(queries).toBeTruthy();
    expect(mutations).toBeTruthy();
    expect(queries.item.length).toBe(QUERY_COUNT);
    expect(mutations.item.length).toBe(MUTATION_COUNT);
  });

  it('contains comprehensive OpenAPI operation catalog metadata', () => {
    const openapiText = fs.readFileSync(openapiPath, 'utf8');

    expect(openapiText).toContain('x-graphql-operation-catalog:');
    expect(openapiText).toContain(`queryCount: ${QUERY_COUNT}`);
    expect(openapiText).toContain(`mutationCount: ${MUTATION_COUNT}`);
  });
});
