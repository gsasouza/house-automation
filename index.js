// import { start } from './server'
//
// export default start()
const PubNub = require('pubnub');
pubnub = new PubNub({
  publishKey : "pub-c-d9617b02-4078-4c60-8136-bdae6b5c308e",
  subscribeKey : "sub-c-baa58ff0-8d5b-11e9-8277-da7aa9a31542"
});

let publishConfig = {
  channel : "pubnub_onboarding_channel",
  message : "Hello From JavaScript SDK"
}

pubnub.publish(publishConfig, function(status, response) {
  console.log(status, response);
});
