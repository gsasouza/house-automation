import mongoose from 'mongoose';
import { getLoaders } from '../src/graphql/loaders/middleware';

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

export * from './createRows';

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
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  global.__COUNTERS__.clear();
}

export const getContext = (context = {}) => {
  const dataloaders = getLoaders();
  return {
    req: {},
    dataloaders,
    koaContext: {
      request: {
        ip: '::ffff:127.0.0.1',
      },
      cookies: {
        set: jest.fn(),
      },
    },
    ...context,
  };
};
