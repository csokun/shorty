const app = require('../app');

const config = { logger: false };
const db = [{ code: '123', url: 'http://localhost:8080/123', visit: 1 }];

describe('URL expanding', () => {
  let fastify;

  beforeEach(() => {
    fastify = app({ config, db });
  });
  
  afterEach(() => fastify.close());

  test('should be able to expand code to full url', async () => {
    const response = await fastify.inject({ method: 'GET', url: '/r/123' });
    expect(response.statusCode).toEqual(302); // redirect
    expect(response.headers.location).toEqual(db[0].url);
  });

  test('should return 404 when expanding unknown code', async () => {
    const response = await fastify.inject({ method: 'GET', url: '/r/unknown' });
    expect(response.statusCode).toEqual(404);
  });

  test('should be able to list all shorten url', async () => {
    const { body } = await fastify.inject({ method: 'GET', url: '/r/list' });
    const founded = JSON.parse(body);
    expect(founded).toEqual(db);
  });
});
