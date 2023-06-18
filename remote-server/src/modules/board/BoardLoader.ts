import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { ConnectionArguments } from 'graphql-relay';
import { Board as BoardModel } from './BoardModel';

type BoardType = {
  id: string,
  _id: string,
  name: string
  type: string
  host: string
  port: string
  connected: boolean
  createdBy: string
};

export default class Board {
  id: string;
  _id: string;
  name: string;
  type: string;
  host: string;
  port: string;
  createdBy: string;
  connected: boolean;

  constructor(data: BoardType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.type = data.type;
    this.host = data.host;
    this.port = data.port;
    this.connected = data.connected;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(BoardModel, ids as any));

const viewerCanSee = (context: any) => !!context.user;

export const load = async (context: any, id: string): Promise<any> => {
  if (!id) {
    return null;
  }
  const loader = context && context.dataloaders ? context.dataloaders.BoardLoader : getLoader();
  try {
    const data = await loader.load(id);
    //Bypass if its an event
    return viewerCanSee(context && context.dataloaders ? context : { user: true }) ? new Board(data) : null;

  } catch (err) {
    console.log(err);
    return null;
  }
};

export const clearCache = ({ dataloaders }: any, id: string) => {
  return dataloaders.BoardLoader.clear(id.toString());
};

export const loadBoards = async (context: any, args: ConnectionArguments & { search?: string }) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const boards = BoardModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: boards,
    context,
    args,
    loader: load as any,
  });
};
