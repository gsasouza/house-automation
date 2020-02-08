import { Place as PlaceModel, IPlace } from '@housejs/shared';

import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

export { IPlace } from '@housejs/shared';

export default class Place {
  id: string;
  _id: string;
  name: string;
  reference: string;

  constructor(data: IPlace) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.reference = data.reference;
  }
}

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IPlace>(ids => mongooseLoader(PlaceModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<Place | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.PlaceLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new Place(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.PlaceLoader.clear(id.toString());

interface LoadPlacesArgs extends ConnectionArguments {
  search?: string;
}

export const loadPlaces = async (context: any, args: LoadPlacesArgs) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : {};
  const places = PlaceModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: places,
    context,
    args,
    loader: load,
  });
};
