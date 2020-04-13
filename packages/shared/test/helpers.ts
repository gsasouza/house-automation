import mongoose from 'mongoose';

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

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URL__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
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

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  global.__COUNTERS__.clear();
}
