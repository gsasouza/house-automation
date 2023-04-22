import { Environment, Network, RecordSource, Store, Observable, GraphQLResponse, Variables, RequestParameters } from 'relay-runtime';
import { getAccessToken } from '../helpers/auth';
// @ts-ignore
import { createClient } from 'graphql-ws';
//@TODO fix this
const GRAPHQL_URL = import.meta.env.GRAPHQL_URL || 'http://localhost:4000/graphql'
const SUBSCRIPTION_URL = import.meta.env.SUBSCRIPTION_URL || 'wss://house-automation-api.herokuapp.com/subscriptions'

const wsClient = createClient({
  url: SUBSCRIPTION_URL,
});

const subscribe = (operation: RequestParameters, variables: Variables) => {
  return Observable.create<GraphQLResponse>((sink) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink,
    );
  });
}

const fetchQuery = async (operation: RequestParameters, variables: Variables) => {

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    // @ts-ignore
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getAccessToken(),
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });
  return await response.json();
};

const network = Network.create(fetchQuery, subscribe);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store,
});

export default env;
