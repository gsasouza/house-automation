import { Board } from '@housejs/shared';

import { MESSAGE_TYPES, replyStateChange } from '../../utils';

const BoardConnectEvent = ({ pubnub }) => async ({ id }) => {
  await Board.findOneAndUpdate({ _id: id }, { connected: true });
  replyStateChange(pubnub, { _id: id }, MESSAGE_TYPES.BOARD);
};

export default BoardConnectEvent;
