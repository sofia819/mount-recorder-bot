# Mount Recorder Server

Created by:

- [Sofia Lee](https://www.linkedin.com/in/sofia-lee-58b75114b/)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

- The project is a Discord Bot that utilizes the [Mount Recorder Server API](https://github.com/sofia819/mount_recorder_server)
- The bot allows users to :
  - Search for a mount name by `!mrmount mountName` to see users who still need the mount.
  - Search for a username by `!mruser username` to see what mounts this particular user is missing.
  - Add a user by `!mradd newUserName` to add a new user to the Mount Aecorder Database.

## Technologies

Language

- JavaScript

Environment

- [Node.js](https://nodejs.org/en/)

Framework

- [Express.js](https://expressjs.com/)

Libraries

- [discordjs](https://discord.js.org/#/)
- [dotenv](https://github.com/motdotla/dotenv)
- [node-fetch](https://github.com/node-fetch/node-fetch)

## Setup

To run this project, install it locally using npm:

1. Clone the repository
2. Install dependencies using `npm install`
3. Start the bot using `node index`
