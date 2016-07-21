# HomeSafe

#### An alternative to wandering around searching for SafeWalk locations; aimed at UBC students.

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

##License
Licensed under the MIT License.

##Troubleshooting/Contact
If having issues, contact alex.jordache@alumni.ubc.ca for help.

