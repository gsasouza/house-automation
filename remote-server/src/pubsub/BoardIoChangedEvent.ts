import { BoardIo } from '../modules/boardIo/BoardIOModel'
import pubSub, { EVENTS } from './pubSub'

export default async ({ pin, board }: any) => {
  const boardIo = await BoardIo.findOne({ pin, board });

  await pubSub.publish(EVENTS.BOARD_IO.CHANGED, { BoardIoChanged: { boardIo } });
}
