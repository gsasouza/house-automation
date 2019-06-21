import '@babel/polyfill'
import app from './app';
import { connectDatabase, SERVER_PORT } from '@gsasouza/shared';

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
  await app.listen(SERVER_PORT);
  console.log(`Server started on port ${SERVER_PORT}`);
})();
