const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const chats = require('./chats/chats.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // app.configure(messages);
  app.configure(users);
  app.configure(chats);
};
