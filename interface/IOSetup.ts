import five from 'johnny-five';

import { BoardIO, BoardIOEnum } from '../models/BoardIOModel';

export const initIO = async (board) => {
  const ios = await BoardIO.find({ board: board.id });
  return ios.reduce((acc, { name, type, pin }) => {
    //@TODO add more IO types
    switch (type) {
      case BoardIOEnum.RELAY: {
        const relay = new five.Relay({ pin, type: 'NC', board });
        return { ...acc, [name]: relay };
      }
      default: return acc;
    }
  }, {})
}
