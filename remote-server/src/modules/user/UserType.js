"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const NodeInterface_1 = require("../../schema/NodeInterface");
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: 'User data',
    fields: () => ({
        id: (0, graphql_relay_1.globalIdField)('User'),
        _id: {
            type: graphql_1.GraphQLString,
            resolve: user => user._id,
        },
        name: {
            type: graphql_1.GraphQLString,
            resolve: user => user.name,
        },
        isAdmin: {
            type: graphql_1.GraphQLBoolean,
            resolve: user => user.isAdmin,
        },
        username: {
            type: graphql_1.GraphQLString,
            resolve: user => user.username,
        },
    }),
    interfaces: () => [NodeInterface_1.NodeInterface],
});
exports.default = UserType;
