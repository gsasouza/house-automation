/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/array-type */

import { GraphQLDataloaders } from '../graphql/loaders';

import { Context } from 'koa';
export { Types } from 'mongoose';

export interface GraphQLContext {
  dataloaders: GraphQLDataloaders;
  appplatform: string;
  koaContext: Context;
}
