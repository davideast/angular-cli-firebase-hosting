const client = require('firebase-tools');

module.exports = function() {
  return client.login({ nonInteractive: false });
};
