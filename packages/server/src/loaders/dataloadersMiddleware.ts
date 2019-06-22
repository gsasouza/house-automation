import * as UserLoader from '../modules/user/UserLoader';
import * as RoomLoader from '../modules/room/RoomLoader';

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = {
    RoomLoader: RoomLoader.getLoader(),
    UserLoader: UserLoader.getLoader(),
  }
  await next();
}

