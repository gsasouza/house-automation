import PubNub from 'pubnub';
import { SUBSCRIBE_KEY, PUBLISH_KEY, SECRET_KEY } from '.'

export const createPubNubInstance = () => {
  const pubnub = new PubNub({
    subscribeKey: SUBSCRIBE_KEY,
    publishKey: PUBLISH_KEY,
    secretKey: SECRET_KEY,
    ssl: true
  })
  pubnub.addListener({
    status: (statusEvent) => {
      if (statusEvent.category === "PNConnectedCategory") {
        console.log('PubNub connected')
      }
    },
  });
  return pubnub
}

export const publishMessage = async (instance, channel, message) => new Promise((resolve, reject) => {
  instance.publish({ channel, message }, (status, response) => resolve({ status, response }))
})
