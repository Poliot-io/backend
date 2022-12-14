const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // set the createdAt and updatedAt fields
      (context) => {
        const { data } = context;
        const { createdAt, updatedAt } = data;
        const now = new Date();
        if (!createdAt) {
          data.createdAt = now;
        }
        if (!updatedAt) {
          data.updatedAt = now;
        }

        return context;
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
