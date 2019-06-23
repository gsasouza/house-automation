import five from 'johnny-five';

import { BoardIo } from '@gsasouza/shared'

export enum BoardIOEnum {
  'RELAY' = 'RELAY',
}

export const initIO = async (board) => {
  const ios = await BoardIo.find({ board: board.id });
  return ios.reduce((acc, { _id, type, pin, state }) => {
    //@TODO add more IO types
    console.log(board.type, state);
    switch (type) {
      case BoardIOEnum.RELAY: {
        const relay = new five.Relay({ pin, type: board.type === 'UNO' ? 'NC' : 'NO', board });
        if(state) relay.on();
        else relay.off();
        return { ...acc, [_id]: relay };
      }
      default: return acc;
    }
  }, {})
}
