import board from './interface/Board';
import app from './controllers/App';

export const start = async () => {
  await board(app)
}
