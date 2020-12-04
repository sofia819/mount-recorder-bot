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
    // Split the command into array elements
    const commandContent = message.content.split(' ');
    // Format the rest of the command into a single keyword
    const keyword = formatParam(
      commandContent.length >= 2 ? commandContent : []
    );
    // Check if the command and the keyword have valid lengths
    const validCommandLength = commandContent.length >= 2 && keyword.length > 0;

    let idToQuery;

    // For searching with a mount keyword
    if (validCommandLength) {
      if (message.content.startsWith(MOUNT_COMMAND_PREFIX)) {
        idToQuery = fetchKeywordId(mounts, keyword);
        if (idToQuery > 0) {
          await fetch(
            formatApiEndpoint(API_ENDPOINT_USER_MOUNT_MOUNT, idToQuery)
          )
            .then((res) => res.json())
            .then((data) => {
              const results = formatMountResponse(data);
              console.log(results);
              message.channel.send(results);
            });
        } else {
          message.channel.send(KEYWORD_NOT_EXIST);
        }
        // For searching with a username keyword
      } else if (message.content.startsWith(USER_COMMAND_PREFIX)) {
        idToQuery = fetchKeywordId(users, keyword);
        if (idToQuery > 0) {
          await fetch(
            formatApiEndpoint(API_ENDPOINT_USER_MOUNT_USER, idToQuery)
          )
            .then((res) => res.json())
            .then((data) => {
              const results = formatUserResponse(data);
              console.log(results);
              message.channel.send(results);
            });
        } else {
          message.channel.send(KEYWORD_NOT_EXIST);
        }
        // For adding a new user
      } else if (message.content.startsWith(ADD_USER_COMMAND_PREFIX)) {
        const username = formatParam(commandContent);
        await fetch(API_ENDPOINT_USER, {
          method: 'POST',
          body: JSON.stringify({
            username,
          }),
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
      }
    }
  }
});

client.on('ready', () => {
  setInterval(() => {
    console.log(FIFTEEN_MINUTES_MESSAGE);
  }, FIFTEEN_MINUTES);
});
