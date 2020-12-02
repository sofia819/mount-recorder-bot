require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { API_ENDPOINT_USER_MOUNT, FIFTEEN_MINUTES } = require('./constants');
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
            const usersLackingMount = data.filter(
              (userMount) => !userMount.owned
            );
            if (usersLackingMount.length > 0) {
              const results = `Users who still need ${
                usersLackingMount[0].mount_name
              }:\n${usersLackingMount
                .map((userMount) => userMount.username)
                .sort((a, b) => a.localeCompare(b))
                .join('\n')}`;

              message.channel.send(results);
            }
          })
      : message.channel.send('Format error: ' + '!mount mountId');
  }
});

client.on('ready', () => {
  setInterval(() => {
    console.log('It has been 15 minutes');
  }, FIFTEEN_MINUTES);
});
