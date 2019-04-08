const path = require('path');
const Fastify = require('fastify');
const fastifyFavicon = require('fastify-favicon');
const fastifyStatic = require('fastify-static');
const Schema = require('./schemas');

module.exports = ({ config, db }) => {
  const fastify = Fastify(config);

  // plugins
  fastify.register(fastifyFavicon);
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '/public')
  });

  /**
   * POST /r
   * register new url
   */
  fastify.post('/r', Schema.Post, async (req, reply) => {
    const { code, url } = req.body;

    const record = db.find(col => col.code === code);
    if (record != null) {
      reply.code(400).send('code is already used');
    } else {
      db.push({ code, url, visit: 0 });
      reply.send('Success');
    }
  });

  /**
   * GET /r/list
   * List all registered urls
   */
  fastify.get('/r/list', Schema.GetAll, (req, reply) => {
    reply.send(db);
  });

  /**
   * GET /r/:code
   * Visit & redirect to original url
   */
  fastify.get('/r/:code', Schema.Get, async (req, reply) => {
    const { code } = req.params;

    const record = db.find(col => col.code === code);
    if (record == null) {
      reply.code(404).send('Not found');
    } else {
      record.visit += 1;
      reply.redirect(record.url);
    }
  });

  return fastify;
};
