# angular-cli-firebase-hosting

Angular CLI addon for deploying apps to Firebase Hosting.

## Installation & Setup

This addon has the following prerequisites:

- Node.js 4.x
- Angular project created via [angular-cli](https://github.com/angular/angular-cli)
- [A current Firebase App](https://firebase.com/)

To install:

```sh
npm install --save-dev angular-cli-firebase-hosting
```

## Usage

There's a one-time setup command to create a `firebase.json` file:

```sh
ng firebase:init # --firebase "my-firebase-app" --public "./dist"
```

After the initial setup, deploy with:

```sh
ng firebase:deploy
```

## Authors

- [DavidEast](http://twitter.com/_davideast)
- Based on [angular-cli-github-pages](https://github.com/IgorMinar/angular-cli-github-pages) by [Igor Minar](http://twitter.com/_davideast), which is based on [ember-cli-github-pages](https://github.com/poetic/ember-cli-github-pages) by [Jake Craige](http://twitter.com/jakecraige)

## License

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
