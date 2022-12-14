const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

module.exports = function (app) {
  mongoose.connect(app.get('mongodb'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
