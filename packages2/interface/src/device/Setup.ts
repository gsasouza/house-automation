import { Device, DeviceEnum } from '@housejs/shared';

import five from 'johnny-five';

type Pin = {
  [key: string]: any;
};

const createRelay = ({ board, pin, state, _id }) => {
  const relay = new five.Relay({ pin, type: 'NC', board });
  if (state) relay.on();
  else relay.off();
  return { [_id]: relay };
};

const createDeviceByType = async device => {
  const { type } = device;
  switch (type) {
    case DeviceEnum.RELAY:
      return createRelay(device);
    default:
      return null;
  }
};

const formatDevices = (pins: Pin[]) => pins.reduce((acc, pin) => ({ ...acc, ...pin }), {});

export const devicesSetup = async board => {
  const devices = await Device.find({ board: board.id });
  const connectedDevices: Pin[] = [];
  for (const device of devices) {
    const createdDevice = await createDeviceByType({ ...device, board });
    if (createdDevice) connectedDevices.push(createdDevice);
  }
  return formatDevices(connectedDevices);
};
