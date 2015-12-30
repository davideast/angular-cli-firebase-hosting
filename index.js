/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-firebase-hosting',

  includedCommands: function() {
    return {
      'firebase:deploy': require('./lib/commands/deploy'),
      'firebase:init': require('./lib/commands/firebase-init.js')
    };
  }
};
