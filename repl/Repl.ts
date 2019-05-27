import Repl from 'repl';

import { connect } from '../config/db';
import { User } from '../models/UserModel';

(async () => {
  try {
    await connect();

    const repl = Repl.start('house::automation> ');

    repl.context.User = User;

  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
})();
