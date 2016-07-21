# HomeSafe

#### An alternative to wandering around searching for SafeWalk locations; aimed at UBC students.

[![License] (https://img.shields.io/badge/license-MIT%20License-blue.svg)]()
[![Dependency Status](https://img.shields.io/david/therealAJ/HomeSafe.svg)](https://david-dm.org/therealAJ/HomeSafe)
[![Git Stars](https://img.shields.io/github/stars/therealAJ/HomeSafe.svg)](https://github.com/therealAJ/HomeSafe)
[![Version] (https://img.shields.io/badge/version-1.0-orange.svg)]()

![alt tag](https://raw.githubusercontent.com/therealAJ/HomeSafe/master/Animation.gif)

##Quick Start

**This quick start guide assumes you have node/npm and mongodb installed and running**
First clone/download repository.

Then create your `config.js` file. It should follow this template,
```js
  module.exports = {
    database: 'your_mongodb_uri/database',
    secret: 'your_secret_key',
    port: 3000,
  }
```

Then run ```$node server.js``` and your app should be running at 127.0.0.1:3000

##Technologies Used
**Frontend:** HTML5, CSS3, AngularJS, JavaScript

**Backend:** Node.js, MongoDB, Express.js

**Libraries:** Google Maps API, Google Directions API

##License
Licensed under the MIT License.

##Troubleshooting/Contact
If having issues, contact alex.jordache@alumni.ubc.ca for help.

