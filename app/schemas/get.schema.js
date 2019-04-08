const Shorty = require('./shorty.model');

module.exports = {
  schema: {
    response: {
      200: { ...Shorty }
    }
  }
};
