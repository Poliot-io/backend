// messages-model.js - A mongoose model

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const messages = new Schema(
    {
      // sender: { type: Schema.Types.ObjectId, ref: 'Usuario' },
      // receiver: { type: Schema.Types.ObjectId, ref: 'Usuario' },
      text: { type: String, required: true },
      userId: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('Message', messages);
};
