const Slackbot = require('slackbots');
const dotenv = require('dotenv');

dotenv.config({ path: 'variables.env' });

// Configure slackbot
const Bucket = new Slackbot({
  token: process.env.SLACKBOT_TOKEN,
  name: process.env.SLACKBOT_NAME,
});
Bucket.on('start', () => {
  console.log('Bucket is up!');
  Bucket.postMessageToChannel('general', `${Bucket.name} is at your service.`);
});
