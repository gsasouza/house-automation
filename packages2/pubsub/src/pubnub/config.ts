import PubNub from 'pubnub';

export type PubNubCredentials = {
  subscribeKey: string;
  publishKey: string;
  secretKey: string;
  ssl?: boolean;
};

export const createPubNubInstance = (credentials: PubNubCredentials) => {
  const pubnub = new PubNub({
    ssl: true,
    ...credentials,
  });
  pubnub.addListener({
    status: statusEvent => {
      if (statusEvent.category === 'PNConnectedCategory') console.log('PubNub connected'); //eslint-disable-line no-console
    },
  });
  return pubnub;
};

export const publishMessage = async (instance, channel, message) =>
  new Promise(resolve => instance.publish({ channel, message }, (status, response) => resolve({ status, response })));
