// Initializes the `todos` service on path `/todos`
const { Service } = require('feathers-mongoose');
const createChatModel = require('../../models/chats.model');
const createMessageModel = require('../../models/messages.model');
const hooks = require('./chats.hooks');

module.exports = async function (app) {
  const Model = createChatModel(app);
  const MessageModel = createMessageModel(app);

  class ChatService extends Service {
    async find(params) {
      return super.find(params);
    }

    create(data, params) {
      return super.create(data, params);
    }

    patch(id, data, params) {
      const message = new MessageModel(data);

      const newData = {
        $push: {
          messages: message,
        },
      };

      return super.patch(id, newData, params);
    }
  }

  const paginate = app.get('paginate');

  const options = {
    Model,
    whitelist: ['$populate'],
    lean: true,
    paginate,
    multi: true,
  };

  app.use('/chats', new ChatService(options));

  // Get our initialized service so that we can register hooks
  const chat_service = app.service('chats');

  const { data } = await chat_service.find({ type: 'global' });

  // si ya existe un chat con el type 'global' no crear
  if (!data.length) {
    // crear un chat
    chat_service.create({
      type: 'global',
      messages: [],
      users: [],
    });
  }

  chat_service.hooks(hooks);
};
