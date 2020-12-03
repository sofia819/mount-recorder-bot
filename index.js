require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const {
  API_ENDPOINT_MOUNT,
  API_ENDPOINT_USER_MOUNT,
  FIFTEEN_MINUTES,
  FIFTEEN_MINUTES_MESSAGE,
  MOUNT_COMMAND_PREFIX,
  MOUNT_NOT_EXIST,
  FORMAT_ERROR,
} = require('./constants');
const { formatApiEndpoint, formatMountLackingUserResults } = require('./utils');

const client = new Discord.Client();
let mountNames;

client.once('ready', async () => {
  mountNames = await fetch(API_ENDPOINT_MOUNT)
    .then((res) => res.json())
    .then((data) => data.map((mount) => mount.mount_name));
  console.log('Mount Recorder Bot is ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async (message) => {
  if (!message.author.bot && message.content.startsWith(MOUNT_COMMAND_PREFIX)) {
    const usersLackingMount = message.content.split(' ');
    if (usersLackingMount.length == 2 && usersLackingMount[1].length > 0) {
      const mountId =
        mountNames.findIndex(
          (mountName) =>
            mountName.toLowerCase() === usersLackingMount[1].toLowerCase()
        ) + 1;
      if (mountId > 0) {
        await fetch(formatApiEndpoint(API_ENDPOINT_USER_MOUNT, mountId))
          .then((res) => res.json())
          .then((data) => {
            if (usersLackingMount.length > 0) {
              const results = formatMountLackingUserResults(
                data.filter((userMount) => !userMount.owned)
              );
              console.log(results);
              message.channel.send(results);
            }
          });
      } else {
        message.channel.send(MOUNT_NOT_EXIST);
      }
    } else {
      message.channel.send(FORMAT_ERROR);
    }
  }
});

client.on('ready', () => {
  setInterval(() => {
    console.log(FIFTEEN_MINUTES_MESSAGE);
  }, FIFTEEN_MINUTES);
});
