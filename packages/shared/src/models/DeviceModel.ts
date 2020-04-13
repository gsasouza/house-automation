import { IWorkspace } from './WorkspaceModel';

import mongoose, { Document, Model, Schema } from 'mongoose';
import { IRoom } from './RoomModel';
import { IBoard } from './BoardModel';

export enum DeviceEnum {
  'RELAY' = 'RELAY',
}

export interface IDevice extends Document {
  name: string;
  type: DeviceEnum;
  pin: string;
  createdBy: string;
  state: boolean;
  workspace: IWorkspace;
  room: IRoom;
  board: IBoard;
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
    workspace: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
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
