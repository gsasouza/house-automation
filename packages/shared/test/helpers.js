const mongoose = require('mongoose');
const jest = require('jest');

process.env.NODE_ENV = 'test';

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 20000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Just in case you want to debug something
// mongoose.set('debug', true);

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing

async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URL__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}

async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

async function disconnectMongoose() {
  await mongoose.disconnect();
  // dumb mongoose
  mongoose.connections.forEach(connection => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach(modelName => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach(collectionName => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach(modelSchemaName => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
}

async function clearDbAndRestartCounters() {
  await clearDatabase();
  global.__COUNTERS__.clear();
}

const Counters = {
  values: {},
  increase(type) {
    if (this.values[type]) return (this.values = { ...this.values, [type]: this.values[type] + 1 });
    return (this.values = {
      ...this.values,
      [type]: 0,
    });
  },
  clear() {
    this.values = {};
  },
};

module.exports = {
  Counters,
  clearDbAndRestartCounters,
  disconnectMongoose,
  clearDatabase,
  connectMongoose,
};
