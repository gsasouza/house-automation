import path from 'path';
import Repl from 'repl';

import { connectDatabase } from '../database';
import { User, Board, Device, AdminUser } from '../models';

import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  allowEmptyValues: process.env.NODE_ENV !== 'production',
  path: root('.env'),
  sample: root('.env.example'),
});

const MONGO_URL = process.env.MONGO_URL || '';

(async () => {
  try {
    await connectDatabase(MONGO_URL);
    const repl = Repl.start('house::js>> ');
    repl.context.User = User;
    repl.context.Board = Board;
    repl.context.Device = Device;
    repl.context.AdminUser = AdminUser;
  } catch (error) {
    console.log(error);
    console.error('Unable to connect to database'); // eslint-disable-line no-console
    process.exit(1);
  }
})();
