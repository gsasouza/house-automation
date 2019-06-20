const {
  EtherPortClient
} = require('etherport-client');
const five = require('johnny-five');
const board = new five.Board({
  port: new EtherPortClient({
    host: '192.168.15.23',
    port: 3030
  }),
  repl: false
});

const LED_PIN = 2;

board.on('ready', () => {
  const relay = new five.Relay({ pin: 13, type: 'NC', board });
  let value = 0;
  setInterval(() => {
    if (value) {
      rela0y.on();
      value = 0;
    } else {
      relay.off();
      value = 1;
    }
  }, 500);
});
