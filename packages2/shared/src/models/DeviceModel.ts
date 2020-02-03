import mongoose, { Document, Model } from 'mongoose';

export enum DeviceEnum {
  'RELAY' = 'RELAY',
}

export interface IDevice extends Document {
  name: string;
  type: DeviceEnum;
  pin: string;
  board: string;
  id: string;
  _id: string;
  state: boolean;
  room: string;
  createdBy: string;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.keys(DeviceEnum),
    },
    pin: {
      type: String,
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    state: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
export const Device: Model<IDevice> = mongoose.model('device', schema);
