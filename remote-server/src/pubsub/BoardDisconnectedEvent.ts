import { BoardIo } from '../modules/boardIo/BoardIOModel'
import pubSub, { EVENTS } from './pubSub'

export default async ({ id }: any) => {
  const connectedBoardIos = await BoardIo.find({ board: id });
  for (const boardIo of connectedBoardIos) {
    await pubSub.publish(EVENTS.BOARD_IO.CHANGED, { BoardIoChanged: { boardIo, connected: false } });
  }
}
