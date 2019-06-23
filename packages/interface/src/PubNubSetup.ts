import { createPubNubInstance, publishMessage, BoardIo, Board } from '@gsasouza/shared';

export const pubNubSetup = (pubnub, boards) => {
  pubnub.subscribe({
    channels: ['cloud:board_io']
  });

  pubnub.addListener({
    message: async ({ message }) => {
      const { id, state } = message;
      try {
        const boardIo = await BoardIo.findOne({ _id: id });
        if (!boardIo) return;
        const board = boards.filter(b => b.id.toString() === boardIo.board.toString())[0];
        if (!board) return;
        const { pins } = board;
        const pin = pins[boardIo._id.toString()];
        if (!pin) return;
        if (state) pin.on();
        else pin.off();
        await BoardIo.findOneAndUpdate({ _id: id }, { state }, { new: true});
        publishMessage(pubnub, 'local:board_io', { id })
      } catch (e) {
        console.log(e);
        return;
      }
    },
  })
}
