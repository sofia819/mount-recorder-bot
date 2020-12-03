const API_ENDPOINT = 'https://mount-recorder-server.herokuapp.com';

const API_ENDPOINT_MOUNT = 'https://mount-recorder-server.herokuapp.com/mounts';

const API_ENDPOINT_USER_MOUNT =
  'https://mount-recorder-server.herokuapp.com/user-mounts/mount';

const FIFTEEN_MINUTES = 900000;

const FIFTEEN_MINUTES_MESSAGE = 'It has been 15 minutes';

const MOUNT_COMMAND_PREFIX = '!mount';

const MOUNT_NOT_EXIST = "The mount specified doesn't exist.";

const FORMAT_ERROR = 'Format error: `!mount mountName.`';

module.exports = {
  API_ENDPOINT,
  API_ENDPOINT_MOUNT,
  API_ENDPOINT_USER_MOUNT,
  FIFTEEN_MINUTES,
  FIFTEEN_MINUTES_MESSAGE,
  MOUNT_COMMAND_PREFIX,
  MOUNT_NOT_EXIST,
  FORMAT_ERROR,
};
