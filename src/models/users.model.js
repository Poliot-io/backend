// users-model.js - A mongoose model
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(
    {
      nickname: { type: String, unique: true },
      avatarProfile: { type: String },
      online: { type: Boolean, default: false },
      email: { type: String, unique: true, lowercase: true },
      password: { type: String },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongooseClient.model('User', users);
};
