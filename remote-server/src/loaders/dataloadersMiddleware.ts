import {  NextFunction, Response, Request} from 'express'
import * as UserLoader from '../modules/user/UserLoader';
import * as RoomLoader from '../modules/room/RoomLoader';
import * as BoardLoader from '../modules/board/BoardLoader';
import * as BoardIoLoader from '../modules/boardIo/BoardIoLoader';
import { IUser } from "../modules/user/UserModel";

type RequestContext = {
  dataloaders: any
  user: IUser | null
}

declare global {
  namespace Express {
    interface Request {
      context: RequestContext
    }
  }
}
export const getDataLoaders = () => {
  return {
    RoomLoader: RoomLoader.getLoader(),
    UserLoader: UserLoader.getLoader(),
    BoardLoader: BoardLoader.getLoader(),
    BoardIoLoader: BoardIoLoader.getLoader(),
  }
}

