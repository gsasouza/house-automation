import { DeviceLoader, RoomLoader, UserLoader, BoardLoader } from './loaders';

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = {
    RoomLoader: RoomLoader.getLoader(),
    UserLoader: UserLoader.getLoader(),
    BoardLoader: BoardLoader.getLoader(),
    DeviceLoader: DeviceLoader.getLoader(),
  };
  await next();
};
