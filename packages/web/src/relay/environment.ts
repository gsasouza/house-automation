import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { getAccessToken } from '../helpers/auth';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'
//@TODO fix this
const GRAPHQL_URL =  process.env.GRAPHQL_URL || 'http://localhost:8080/graphql'


const fetchQuery = async (operation, variables, cacheConfig, uploadables) => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
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

const network = Network.create(RelayNetworkLogger.wrapFetch(fetchQuery, () => ''));

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store,
});

export default env;
