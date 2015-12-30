
module.exports = function(error) {
  const errorMessage = 'Command requires authentication';
  if (error.message.substr(0, errorMessage.length) === errorMessage) {
    return 'Authentication required: Run firebase login\n';
  }
};
