import { BoardIo } from '../modules/boardIo/BoardIOModel'
import pubSub, { EVENTS } from './pubSub'

export default async ({ id }) => {
  const boardIo = await BoardIo.findOne({ _id: id });
  await pubSub.publish(EVENTS.BOARD_IO.CHANGED, { BoardIoChanged: { boardIo } });
}
