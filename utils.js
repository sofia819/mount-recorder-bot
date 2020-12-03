const formatApiEndpoint = (endpoint, keyword) => `${endpoint}/${keyword}`;

const formatMountResponse = (usersLackingMount) =>
  `Users who still need ${usersLackingMount[0].mount_name}:\n${usersLackingMount
    .filter((user) => !user.owned)
    .map((user) => user.username)
    .sort((a, b) => a.localeCompare(b))
    .join('\n')}`;

const formatUserResponse = (mountsUserLacking) =>
  `${mountsUserLacking[0].username} needs:\n${mountsUserLacking
    .filter((mount) => !mount.owned)
    .map((mount) => mount.mount_name)
    .join('\n')}`;

const fetchKeywordId = (arr, commandContent) => {
  const keyword = commandContent.slice(1).join(' ');
  const found = arr.find(
    (val) => val.name.toLowerCase() === keyword.toLowerCase()
  );
  return found ? found.id : 0;
};

module.exports = {
  formatApiEndpoint,
  formatMountResponse,
  formatUserResponse,
  fetchKeywordId,
};
