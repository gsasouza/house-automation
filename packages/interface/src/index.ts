import 'core-js';

import { connectDatabase } from '@housejs/shared';

import app from './app';
import { LOCAL_PORT, MONGO_URL } from './common/config';
import { boardsSetup } from './board/Setup'

(async () => {
  try {
    await connectDatabase(MONGO_URL);
  } catch (error) {
    console.error('Could not connect to database', { error }); // eslint-disable-line no-console
    process.exit(1);
  }
  await boardsSetup();
  // eslint-disable-next-line no-console
  app.listen(LOCAL_PORT, () => console.log(`Server started on port ${LOCAL_PORT}`));
})();
