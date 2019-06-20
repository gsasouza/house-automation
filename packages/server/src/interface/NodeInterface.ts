import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import * as UserLoader from '../modules/user/UserLoader';

import UserType from '../modules/user/UserType';

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'User') {
      return await UserLoader.load(context, id);
    }
  },
  obj => {
    if (obj instanceof UserLoader.default) {
      return UserType;
    }
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
