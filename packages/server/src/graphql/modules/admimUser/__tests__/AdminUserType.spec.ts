import {
  clearDbAndRestartCounters,
  connectMongoose,
  createAdminUser,
  disconnectMongoose,
  getContext,
} from '../../../../../test/helpers';
import { toGlobalId } from 'graphql-relay';
import { graphql } from 'graphql';
import schema from '../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Server: AdminUserType', () => {
  it('Should query an user', async () => {
    const adminUser = await createAdminUser();
    // language=GraphQL
    const query = `
      query Q($id: ID!) {
        adminUser: node(id: $id) {
          id
          ... on AdminUser {
            id
            username
            name
            email
          }
        }
      }
    `;

    const variables = {
      id: toGlobalId('AdminUser', adminUser._id),
    };
    const rootValue = {};
    const context = await getContext({ user: true });
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(
      {
        adminUser: {
          id: expect.any(String),
        },
      },
      `
      Object {
        "adminUser": Object {
          "email": "admin_user#1",
          "id": Any<String>,
          "name": "AdminUser#1",
          "username": "admin_user#1",
        },
      }
    `,
    );
  });

  it('Should query a list of users', async () => {
    await createAdminUser();
    await createAdminUser();
    await createAdminUser();
    await createAdminUser();

    // language=GraphQL
    const query = `
      query Q {
        adminUsers (first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    `;

    const context = await getContext({ user: true });
    const result = await graphql(schema, query, {}, context, {});

    expect(result.data).toMatchSnapshot();
  });

  it('Should search a list of users', async () => {
    await createAdminUser();
    await createAdminUser();
    await createAdminUser({ name: 'search 1' });
    await createAdminUser({ name: 'search 2' });

    // language=GraphQL
    const query = `
      query Q ($search: String!) {
        adminUsers (search: $search) {
          edges {
            node {
              name
            }
          }
        }
      }
    `;

    const variables = { search: 'search' };
    const context = await getContext({ user: true });
    const result = await graphql(schema, query, {}, context, variables);

    expect(result.data).toMatchSnapshot();
  });
});
