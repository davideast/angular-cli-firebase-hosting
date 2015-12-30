'use strict';

const exec = require('child_process').exec;
const RSVP = require('rsvp');
const https = require('https');
const inquire = require('inquirer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const client = require('firebase-tools');

module.exports = {
  name: 'firebase:deploy',
  aliases: ['firebase:deploy'],
  description: 'Build the test app for production and deploy to Firebase Hosting',
  works: 'insideProject',

  availableOptions: [{
    name:         'message',
    type:         String,
    default:      '',
    description:  'The commit message to include with the build, must be wrapped in quotes.'
  }, {
    name:         'environment',
    type:         String,
    default:      'production',
    description:  'The Angular environment to create a build for'
  }],

  run: function(options, rawArgs) {
    var ui          = this.ui;
    var root        = this.project.root;
    var execOptions = { cwd: root };


    function buildApp() {
      var env = options.environment;
      return runCommand('ng build --environment=' + env, execOptions);
    }

    function getCwdPath() {
       var content = fs.readFileSync('firebase.json');
       var config = JSON.parse(content);
       return config.public;
    }

    function firebaseDeploy(cwd) {
      return client.deploy({cwd: cwd });
    }

    return buildApp()
      .then(getCwdPath)
      .then(firebaseDeploy)
      .then(function(data) {
        if (data) {
          ui.write('Deployed!');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

function runCommand(/* child_process.exec args */) {
  var args = Array.prototype.slice.call(arguments);

  var lastIndex = args.length - 1;
  var lastArg   = args[lastIndex];
  var logOutput = false;
  if (typeof lastArg === 'boolean') {
    logOutput = lastArg;
    args.splice(lastIndex);
  }

  return new RSVP.Promise(function(resolve, reject) {
    var cb = function(err, stdout, stderr) {
      if (stderr) {
        console.log(stderr);
      }

      if (logOutput && stdout) {
        console.log(stdout);
      }

      if (err) {
        return reject(err);
      }

      return resolve(stdout);
    };

    args.push(cb);
    exec.apply(exec, args);
  }.bind(this));
}
