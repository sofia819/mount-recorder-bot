require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { API_ENDPOINT_USER_MOUNT } = require('./constants');
const { formatApiEndpoint } = require('./utils');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Mount Recorder Bot is ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async (message) => {
  if (!message.author.bot && message.content.startsWith('!mount')) {
    const usersLackingMount = message.content.split(' ');
    usersLackingMount.length == 2
      ? await fetch(
          formatApiEndpoint(API_ENDPOINT_USER_MOUNT, usersLackingMount[1])
        )
          .then((res) => res.json())
          .then((data) => {
            const usersLackingMount = data
              .filter((userMount) => !userMount.owned)
              .map((userMount) => userMount.username);
            message.channel.send(usersLackingMount.join('\n'));
          })
      : message.channel.send('Format error: ' + '!mount mountId');
  }
});
