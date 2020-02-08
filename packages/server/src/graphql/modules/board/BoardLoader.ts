import { Board as BoardModel, IBoard } from '@housejs/shared';

import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

export { IBoard } from '@housejs/shared';

export default class Board {
  id: string;
  _id: string;
  name: string;
  type: string;
  host?: string;
  port?: string;
  createdBy: string;
  connected: boolean;

  constructor(data: IBoard) {
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

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IBoard>(ids => mongooseLoader(BoardModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<Board | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.BoardLoader.load(id);
    if (!data) return null;
    //Bypass if its an event
    return viewerCanSee(context.dataloaders ? context : { user: true }) ? new Board(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.BoardLoader.clear(id.toString());

interface LoadBoardsArgs extends ConnectionArguments {
  search?: string;
}

export const loadBoards = async (context: any, args: LoadBoardsArgs) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : {};
  const boards = BoardModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: boards,
    context,
    args,
    loader: load,
  });
};
