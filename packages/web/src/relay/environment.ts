import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { getAccessToken } from '../helpers/auth';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'
import { SubscriptionClient } from 'subscriptions-transport-ws'
//@TODO fix this
const GRAPHQL_URL = process.env.GRAPHQL_URL || 'http://localhost:8080/graphql'
const SUBSCRIPTION_URL = process.env.SUBSCRIPTION_URL || 'wss://house-automation-api.herokuapp.com/subscriptions'

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(SUBSCRIPTION_URL, {reconnect: true})
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result})
  })
}

const fetchQuery = async (operation, variables) => {
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

const network = Network.create(RelayNetworkLogger.wrapFetch(fetchQuery, () => ''), setupSubscription);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store,
});

export default env;
