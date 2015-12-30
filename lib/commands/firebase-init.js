'use strict';

const exec = require('child_process').exec;
const RSVP = require('rsvp');
const client = require('firebase-tools');

module.exports = {
  name: 'firebase:init',
  aliases: ['firebase:init'],
  description: 'Initialize an app on Firebase Hosting',
  works: 'insideProject',

  availableOptions: [{
    name:         'firebase',
    type:         String,
    default:      '',
    description:  'Which Firebase app to use for the application'
  }, {
    name:         'environment',
    type:         String,
    default:      'production',
    description:  'The Angular environment to create a build for'
  }, {
    name:         'public',
    type:         String,
    default:      './dist',
    description:  'Folder that contains the application'
  }],

  run: function(options) {
    var ui          = this.ui;
    var root        = this.project.root;
    var execOptions = { cwd: root };
    const firebase = options.firebase;
    const environment = options.environment;
    const publicFolder = options.public;

    function buildApp() {
      return runCommand('ng build --environment=' + environment, execOptions);
    }

    function initializeFirebase() {
      return client.init({
        firebase: firebase,
        public: publicFolder
      });
    }

    return buildApp()
      .then(initializeFirebase)
      .then(function(data) {
        if(data) {
          ui.write(`Firebase app initialized`);
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
