import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { User } from '@gsasouza/shared';
import { generateToken } from '../../../auth';

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return {
        token: null,
        error: 'INVALID_USERNAME_PASSWORD',
      };
    }

    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      return {
        token: null,
        error: 'INVALID_USERNAME_PASSWORD',
      };
    }

    return {
      token: generateToken(user),
      error: null,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
