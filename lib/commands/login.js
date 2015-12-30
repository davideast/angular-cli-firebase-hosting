'use strict';

const exec = require('child_process').exec;
const RSVP = require('rsvp');
const client = require('firebase-tools');
const login = require('../hosting/login');

module.exports = {
  name: 'firebase:login',
  aliases: ['firebase:login'],
  description: 'Initialize an app on Firebase Hosting',
  works: 'insideProject',

  availableOptions: [{}],

  run: function(options) {
    var ui          = this.ui;
    var root        = this.project.root;
    var execOptions = { cwd: root };

    return login()
      .then(function(data) {
        ui.write('Logged in successfully!\n');
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
