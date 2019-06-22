import * as UserLoader from '../modules/user/UserLoader';
import * as RoomLoader from '../modules/room/RoomLoader';
import * as BoardLoader from '../modules/board/BoardLoader';
import * as BoardIoLoader from '../modules/boardIo/BoardIoLoader';

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = {
    RoomLoader: RoomLoader.getLoader(),
    UserLoader: UserLoader.getLoader(),
    BoardLoader: BoardLoader.getLoader(),
    BoardIoLoader: BoardIoLoader.getLoader(),
  }
  await next();
}

