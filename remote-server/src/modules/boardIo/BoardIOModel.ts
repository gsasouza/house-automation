import mongoose, { Document, Model } from 'mongoose'

export enum BoardIoEnum {
  'RELAY' = 'RELAY',
}

export interface IBoardIo extends Document {
  name: string
  type: BoardIoEnum
  pin: string
  board: string,
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: Object.keys(BoardIoEnum),
    },
    pin: {
      type: String,
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board'
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    state: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)
export const BoardIo: Model<IBoardIo> = mongoose.model('boardIo', schema)
