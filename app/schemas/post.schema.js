module.exports = {
  schema: {
    body: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          minimum: 3,
          maximum: 24
        },
        url: {
          type: 'string',
          format: 'uri'
        }
      },
      required: ['code', 'url']
    },
    response: {
      200: {
        type: 'string'
      }
    }
  }
};
