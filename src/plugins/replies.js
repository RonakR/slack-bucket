exports.setup = slackbot => {
  slackbot.on('message', data => console.log('Message: ', data));
};
