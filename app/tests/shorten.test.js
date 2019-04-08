const app = require('../app');

const config = { logger: false };
const db = [{ code: 'existing', url: 'http://localhost:8080/existing', visit: 0 }];

describe('URL shortening', () => {
  let fastify;
  beforeEach(() => {
    fastify = app({ config, db });
  });

  afterEach(() => fastify.close());

  test('should reject request if url is not conformed to uri', async () => {
    const res = await fastify.inject({
      method: 'POST',
      url: '/r',
      payload: {
        code: 'test',
        url: 'what is it?'
      }
    });

    expect(res.statusCode).toEqual(400);

    const body = JSON.parse(res.body);
    expect(body.message).toEqual('body.url should match format "uri"');
  });

  test('should be able to shorten url', async () => {
    await fastify.inject({
      method: 'POST',
      url: '/r',
      payload: {
        code: 'test',
        url: 'http://localhost:8080/test'
      }
    }).then((response) => {
      expect(response.body).toEqual('Success');
    });
  });
  
  test('should not accept duplicate code', async () => {
    await fastify.inject({
      method: 'POST',
      url: '/r',
      payload: {
        code: 'existing',
        url: 'http://localhost:8080/existing'
      }
    }).then((response) => {
      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual('code is already used');
    });
  });
});
