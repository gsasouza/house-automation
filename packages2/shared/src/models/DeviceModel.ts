import mongoose, {Document, Model, Schema} from 'mongoose';
import {IPlace} from './PlaceModel'

export enum DeviceEnum {
  'RELAY' = 'RELAY',
}

export interface IDevice extends Document {
  name: string;
  type: DeviceEnum;
  place: IPlace;
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
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
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
