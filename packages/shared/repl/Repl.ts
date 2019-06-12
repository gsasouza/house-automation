import Repl from 'repl';

import { connect } from '../config/db';
import { User } from '../models/UserModel';
import { Board } from '../models/BoardModel';
import { BoardIO } from '../models/BoardIOModel';

(async () => {
  try {
    await connect();

    const repl = Repl.start('house::automation> ');

    repl.context.User = User;
    repl.context.Board = Board;
    repl.context.BoardIO = BoardIO;

  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
})();
