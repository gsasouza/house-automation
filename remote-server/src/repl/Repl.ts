import Repl from 'repl';

import { connect } from '../config/db';
import { User } from '../modules/user/UserModel';
import { Board } from '../modules/board/BoardModel';
import { BoardIo } from '../modules/boardIo/BoardIOModel';

// User.create({ username: "gsasouza", password: "gabriel123", isAdmin: true, name: "Gabriel Souza"})

(async () => {
  try {
    await connect();

    const repl = Repl.start('house::automation> ');

    repl.context.User = User;
    repl.context.Board = Board;
    repl.context.BoardIO = BoardIo;

  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
})();
