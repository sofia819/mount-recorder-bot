require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const {
  API_ENDPOINT_MOUNT,
  API_ENDPOINT_USER,
  API_ENDPOINT_USER_MOUNT_MOUNT,
  API_ENDPOINT_USER_MOUNT_USER,
  FIFTEEN_MINUTES,
  FIFTEEN_MINUTES_MESSAGE,
  MOUNT_COMMAND_PREFIX,
  USER_COMMAND_PREFIX,
  ADD_USER_COMMAND_PREFIX,
  KEYWORD_NOT_EXIST,
} = require('./constants');
const {
  formatApiEndpoint,
  formatMountResponse,
  formatUserResponse,
  formatAddUserMessage,
  formatParam,
  fetchKeywordId,
} = require('./utils');

const client = new Discord.Client();
let mounts;
let users;

client.once('ready', async () => {
  mounts = await fetch(API_ENDPOINT_MOUNT)
    .then((res) => res.json())
    .then((data) =>
      data.map((mount) => {
        return {
          id: mount.mount_id,
          name: mount.mount_name,
        };
      })
    );
  users = await fetch(API_ENDPOINT_USER)
    .then((res) => res.json())
    .then((data) =>
      data.map((user) => {
        return { id: user.user_id, name: user.username };
      })
    );
  console.log('Mount Recorder Bot is ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async (message) => {
  if (!message.author.bot) {
    const commandContent = message.content.split(' ');
    if (commandContent.length >= 2 && commandContent[1].length > 0) {
      let idToQuery;
      let ApiEndpoint;

      if (message.content.startsWith(MOUNT_COMMAND_PREFIX)) {
        idToQuery = fetchKeywordId(mounts, commandContent);
        ApiEndpoint = API_ENDPOINT_USER_MOUNT_MOUNT;
        if (idToQuery > 0) {
          await fetch(formatApiEndpoint(ApiEndpoint, idToQuery))
            .then((res) => res.json())
            .then((data) => {
              const results = formatMountResponse(data);
              console.log(results);
              message.channel.send(results);
            });
        } else {
          message.channel.send(KEYWORD_NOT_EXIST);
        }
      } else if (message.content.startsWith(USER_COMMAND_PREFIX)) {
        idToQuery = fetchKeywordId(users, commandContent);
        ApiEndpoint = API_ENDPOINT_USER_MOUNT_USER;
        if (idToQuery > 0) {
          await fetch(formatApiEndpoint(ApiEndpoint, idToQuery))
            .then((res) => res.json())
            .then((data) => {
              const results = formatUserResponse(data);
              console.log(results);
              message.channel.send(results);
            });
        }
      } else if (message.content.startsWith(ADD_USER_COMMAND_PREFIX)) {
        ApiEndpoint = API_ENDPOINT_USER;
        const username = formatParam(commandContent);
        const body = {
          username,
        };
        await fetch(ApiEndpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((data) => {
            const success = data.length > 0;
            message.channel.send(formatAddUserMessage(username, success));
            if (success) {
              users.push({ id: data[0].user_id, name: data[0].username });
              console.log(username);
            }
          });
      } else {
        message.channel.send(KEYWORD_NOT_EXIST);
      }
    }
  }
});

client.on('ready', () => {
  setInterval(() => {
    console.log(FIFTEEN_MINUTES_MESSAGE);
  }, FIFTEEN_MINUTES);
});
