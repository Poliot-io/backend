// chats-model.js - A mongoose model

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const chats = new Schema(
    {
      type: { type: String, required: true },
      // users: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
      messages: [
        {
          userId: String,
          text: String,
          createdAt: Date,
          updatedAt: Date,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('Chat', chats);
};
