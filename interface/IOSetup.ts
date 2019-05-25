import five from 'johnny-five';


const setup = () => {
  const lamp1 = new five.Relay({pin: 13, type: 'NC'});
  return {
    lamp1,
  }
}

export default setup
