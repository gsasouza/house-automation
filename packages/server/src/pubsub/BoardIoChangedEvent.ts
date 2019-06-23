import { BoardIo } from '@gsasouza/shared'
import pubSub, { EVENTS } from './pubSub'

export default async ({ id }) => {
  const boardIo = await BoardIo.findOne({ _id: id });
  console.log('event', boardIo);
  await pubSub.publish(EVENTS.BOARD_IO.CHANGED, { BoardIoChanged: { boardIo } });
}
