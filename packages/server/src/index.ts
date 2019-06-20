// import '@babel/polyfill';
import app from './app';
import { connectDatabase, SERVER_PORT } from '@gsasouza/shared';

(async () => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
  await app.listen(SERVER_PORT);
  console.log(`Server started on port ${SERVER_PORT}`);
})();
