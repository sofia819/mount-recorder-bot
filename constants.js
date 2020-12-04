const API_ENDPOINT = 'https://mount-recorder-server.herokuapp.com';

const API_ENDPOINT_MOUNT = 'https://mount-recorder-server.herokuapp.com/mounts';

const API_ENDPOINT_USER = 'https://mount-recorder-server.herokuapp.com/users';

const API_ENDPOINT_USER_MOUNT_MOUNT =
  'https://mount-recorder-server.herokuapp.com/user-mounts/mount';

const API_ENDPOINT_USER_MOUNT_USER =
  'https://mount-recorder-server.herokuapp.com/user-mounts/user';

const FIFTEEN_MINUTES = 900000;

const FIFTEEN_MINUTES_MESSAGE = 'It has been 15 minutes';

const MOUNT_COMMAND_PREFIX = '!mrmount';

const USER_COMMAND_PREFIX = '!mruser';

const ADD_USER_COMMAND_PREFIX = '!mradd';

const KEYWORD_NOT_EXIST = "The keyword specified doesn't exist.";

const FORMAT_ERROR =
  'Format error: `!mrmount mountName.` or `!mruser username.`';

module.exports = {
  API_ENDPOINT,
  API_ENDPOINT_MOUNT,
  API_ENDPOINT_USER,
  API_ENDPOINT_USER_MOUNT_MOUNT,
  API_ENDPOINT_USER_MOUNT_USER,
  FIFTEEN_MINUTES,
  FIFTEEN_MINUTES_MESSAGE,
  USER_COMMAND_PREFIX,
  MOUNT_COMMAND_PREFIX,
  ADD_USER_COMMAND_PREFIX,
  KEYWORD_NOT_EXIST,
  FORMAT_ERROR,
};
