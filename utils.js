const formatApiEndpoint = (endpoint, keyword) => `${endpoint}/${keyword}`;

const formatMountLackingUserResults = (usersLackingMount) =>
  `Users who still need ${usersLackingMount[0].mount_name}:\n${usersLackingMount
    .map((userMount) => userMount.username)
    .sort((a, b) => a.localeCompare(b))
    .join('\n')}`;

module.exports = {
  formatApiEndpoint,
  formatMountLackingUserResults,
};
