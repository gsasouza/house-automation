import { interfaceSubscriptionsSetup } from '@housejs/pubsub';

import { PUBNUB_CREDENTIALS } from './config';

const pubnub = interfaceSubscriptionsSetup(PUBNUB_CREDENTIALS);

Object.freeze(pubnub);

export default pubnub;
