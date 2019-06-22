import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { ConnectionArguments } from 'graphql-relay';
import { BoardIo as BoardIoModel } from '@gsasouza/shared';

type BoardIoType = {
  id: string,
  _id: string,
  name: string
  type: string
  createdBy: string
  pin: string;
  board: string;
  state: boolean;
  room: string;
};

export default class BoardIo {
  id: string;
  _id: string;
  name: string;
  type: string;
  pin: string;
  board: string;
  state: boolean;
  room: string;
  createdBy: string;

  constructor(data: BoardIoType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.type = data.type;
    this.pin = data.pin;
    this.board = data.board;
    this.state = data.state;
    this.room = data.room;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(BoardIoModel, ids));

const viewerCanSee = () => true;

export const load = async (context: any, id: string): Promise<any> => {
  if (!id) {
    return null;
  }
  let data;
  try {
    data = await context.dataloaders.BoardIoLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new BoardIo(data) : null;
};

export const clearCache = ({ dataloaders }: any, id: string) => {
  return dataloaders.BoardIoLoader.clear(id.toString());
};

export const loadBoardIos = async (context: any, args: ConnectionArguments & { search?: string }) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const boardIos = BoardIoModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: boardIos,
    context,
    args,
    loader: load,
  });
};
