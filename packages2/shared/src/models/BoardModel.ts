import mongoose, { Document, Model, Schema } from 'mongoose';

export enum BoardsEnum {
  RASPBERRY = 'RASPBERRY',
  ARDUINO = 'ARDUINO',
  ESP8266 = 'ESP8266',
}

export interface IBoard extends Document {
  name: string;
  type: BoardsEnum;
  host?: string;
  port?: string;
  connected: boolean;
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
      enum: Object.keys(BoardsEnum),
    },
    host: {
      type: String,
      unique: true,
      trim: true,
    },
    port: {
      type: String,
      unique: true,
    },
    connected: {
      type: Boolean,
      required: true,
      default: false,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
export const Board: Model<IBoard> = mongoose.model('board', schema);
