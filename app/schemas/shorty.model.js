module.exports = {
  type: 'object',
  properties: {
    code: {
      type: 'string'
    },
    url: {
      type: 'string',
      format: 'uri'
    },
    visit: {
      type: 'number'
    }
  }
};
