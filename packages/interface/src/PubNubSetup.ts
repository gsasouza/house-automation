import { createPubNubInstance, publishMessage, BoardIo, Board } from '@gsasouza/shared';

export const pubNubSetup = (boards) => {
  const pubnub = createPubNubInstance();
  pubnub.subscribe({
    channels: ['cloud']
  });

  pubnub.addListener({
    message: async ({ message }) => {
      const { id, state } = message;
      try {
        const boardIo = await BoardIo.findOne({ _id: id });
        if (!boardIo) return;
        const { pins }= boards.filter(b => b.id.toString() === boardIo.board.toString())[0];
        const pin = pins[boardIo._id.toString()];
        if (state) pin.on();
        else pin.off();
        const updatedBoardIo = await BoardIo.findOneAndUpdate({ _id: id }, { state }, { new: true});
        publishMessage(pubnub, 'local', { id, state: updatedBoardIo.state })
      } catch (e) {
        console.log(e);
        return;
      }


    },
  })
}
