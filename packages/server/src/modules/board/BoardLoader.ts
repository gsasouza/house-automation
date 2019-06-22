import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { ConnectionArguments } from 'graphql-relay';
import { Board as BoardModel } from '@gsasouza/shared';

type BoardType = {
  id: string,
  _id: string,
  name: string
  type: string
  host: string
  port: string
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

  constructor(data: BoardType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.type = data.type;
    this.host = data.host;
    this.port = data.port;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(BoardModel, ids));

const viewerCanSee = () => true;

export const load = async (context: any, id: string): Promise<any> => {
  if (!id) {
    return null;
  }
  let data;
  try {
    data = await context.dataloaders.BoardLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Board(data) : null;
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
    loader: load,
  });
};
