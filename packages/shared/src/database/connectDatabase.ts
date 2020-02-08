import mongoose from 'mongoose';

declare module 'mongoose' {
  interface ConnectionBase {
    host: string;
    port: number;
    name: string;
  }
}

const connectDatabase = (url: string) => {
  return new Promise((resolve, reject) => {
    // mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => {
        // eslint-disable-next-line no-console
        console.log('ERROR: Connection to DB failed');
        reject(error);
      })
      // Exit Process if there is no longer a Database Connection
      .on('close', () => {
        // eslint-disable-next-line no-console
        console.log('ERROR: Connection to DB lost');
        process.exit(1);
      })
      // Connected to DB
      .once('open', () => {
        // Display connection information
        // eslint-disable-next-line no-console
        mongoose.connections.map(info => console.log(`Connected to ${info.host}:${info.port}/${info.name}`));
        // Return successful promise
        resolve();
      });

    return mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });
};

export default connectDatabase;
