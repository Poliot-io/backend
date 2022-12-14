// Initializes the `todos` service on path `/todos`
const { Service } = require('feathers-mongoose');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');

class MessageService extends Service {
  find(params) {
    return super.find(params);
  }

  create(data, params) {
    return super.create(data, params);
  }

  delete(id, params) {
    return super.remove(id, params);
  }
}

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    whitelist: ['$populate'],
    lean: true,
    paginate,
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use('/messages', new MessageService(options));

  // Get our initialized service so that we can register hooks
  const message_service = app.service('messages');

  message_service.hooks(hooks);
};
