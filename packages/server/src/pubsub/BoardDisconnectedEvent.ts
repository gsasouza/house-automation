import { BoardIo } from '@gsasouza/shared'
import pubSub, { EVENTS } from './pubSub'

export default async ({ id }) => {
  const connectedBoardIos = await BoardIo.find({ board: id });
  for (const boardIo of connectedBoardIos) {
    await pubSub.publish(EVENTS.BOARD_IO.CHANGED, { BoardIoChanged: { boardIo, connected: false } });
  }
}
