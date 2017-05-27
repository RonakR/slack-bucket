const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const Slackbot = require('slackbots');

// Pull in env variables
dotenv.config({ path: 'variables.env' });

//Connect to mongodb
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises, to allow for async/await
mongoose.connection.on('error', err => {
  console.error(`❗❗❗ → ${err.message}`);
});

// Configure slackbot
const Bucket = new Slackbot({
  token: process.env.SLACKBOT_TOKEN,
  name: process.env.SLACKBOT_NAME,
});
Bucket.on('start', () => {
  console.log('Bucket is up!');
  Bucket.postMessageToChannel('general', `${Bucket.name} is at your service.`);
});

// Configure plugins for Bucket
const plugins = require('./src/plugins').plugins;
plugins.map(plugin => {
  require(path.resolve(__dirname, 'src', 'plugins', plugin)).setup(Bucket);
});
