import { Board } from '@housejs/shared';

import { MESSAGE_TYPES, replyStateChange } from '../../utils';

const BoardDisconnectEvent = ({ pubnub }) => async ({ id }) => {
  await Board.findOneAndUpdate({ _id: id }, { connected: false });
  replyStateChange(pubnub, { _id: id }, MESSAGE_TYPES.BOARD);
};

export default BoardDisconnectEvent;
