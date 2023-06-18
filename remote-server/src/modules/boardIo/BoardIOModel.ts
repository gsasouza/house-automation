import mongoose, { Document, Model, Schema } from 'mongoose'

export enum BoardIoEnum {
  'RELAY' = 'RELAY',
}

export interface IBoardIo extends Document {
  name: string
  type: BoardIoEnum
  pin: string
  board: string,
}

const schema = new Schema<any>(
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
    } as any,
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
export const BoardIo: Model<any> = mongoose.model('boardIo', schema)
