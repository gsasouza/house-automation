import { DeviceLoader, RoomLoader, UserLoader, BoardLoader, AdminUserLoader, PlaceLoader } from './loaders';

export const getLoaders = () => ({
  RoomLoader: RoomLoader.getLoader(),
  UserLoader: UserLoader.getLoader(),
  BoardLoader: BoardLoader.getLoader(),
  DeviceLoader: DeviceLoader.getLoader(),
  AdminUserLoader: AdminUserLoader.getLoader(),
  PlaceLoader: PlaceLoader.getLoader(),
});

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = getLoaders();
  await next();
};
