import { graphql } from 'graphql';

import {
  disconnectMongoose,
  connectMongoose,
  clearDbAndRestartCounters,
  createAdminUser,
  getContext,
} from '../../../../../../test/helpers';
import schema from '../../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Server: AdminUser', () => {
  it('Should properly login an admin user', async () => {
    const password = 'password';
    const adminUser = await createAdminUser({ password });

    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!) {
        AdminUserLogin(input: {
          username: $username,
          password: $password
        }) {
          token
          error
        }
      }
    `;

    const variables = {
      username: adminUser.username,
      password,
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(
      {
        AdminUserLogin: {
          token: expect.any(String),
        },
      },
      `
      Object {
        "AdminUserLogin": Object {
          "error": null,
          "token": Any<String>,
        },
      }
    `,
    );
  });

  it('Should not login an admin user with invalid username', async () => {
    const password = 'password';
    await createAdminUser({ password });

    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!) {
        AdminUserLogin(input: {
          username: $username,
          password: $password
        }) {
          token
          error
        }
      }
    `;

    const variables = {
      username: 'INVALID',
      password,
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "AdminUserLogin": Object {
          "error": "INVALID_USERNAME_PASSWORD",
          "token": null,
        },
      }
    `);
  });

  it('Should not login an admin user with invalid password', async () => {
    const adminUser = await createAdminUser();

    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!) {
        AdminUserLogin(input: {
          username: $username,
          password: $password
        }) {
          token
          error
        }
      }
    `;

    const variables = {
      username: adminUser.username,
      password: 'WRONG_PASSWORD',
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "AdminUserLogin": Object {
          "error": "INVALID_USERNAME_PASSWORD",
          "token": null,
        },
      }
    `);
  });
});
