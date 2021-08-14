const users = [];

// Join user to chat
function userJoin({ id, nickname, room }) {
  const user = { id, nickname, room };
  users.push(user);
  return user;
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers,
};
