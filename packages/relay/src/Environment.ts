import executeFunction from './cacheHandler';

import invariant from 'invariant';
import {
  ConnectionHandler,
  Environment,
  HandlerInterface,
  Network,
  RecordSource,
  Store,
  ViewerHandler,
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const websocketURL = `ws://${process.env.GRAPHQL_URL}/subscriptions` || 'ws://localhost:5001/subscriptions';

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;
  const subscriptionClient = new SubscriptionClient(websocketURL, { reconnect: true });
  subscriptionClient.subscribe({ query, variables }, (error, result) => {
    observer.onNext({ data: result });
  });
};

const network = Network.create(executeFunction, setupSubscription);

const source = new RecordSource();
const store = new Store(source);

function RelayDefaultHandlerProvider(handle: string): HandlerInterface {
  switch (handle) {
    case 'connection':
      return ConnectionHandler;
    case 'viewer':
      return ViewerHandler;
  }
  invariant(false, 'RelayDefaultHandlerProvider: No handler provided for `%s`.', handle);
}

const env = new Environment({
  network,
  store,
  handlerProvider: RelayDefaultHandlerProvider,
});

export default env;
