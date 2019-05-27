import mongoose, { Document, Model } from 'mongoose'

export enum BoardIOEnum {
  'RELAY' = 'RELAY',
}

export interface IBoardIO extends Document {
  name: string
  type: BoardIOEnum
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
      enum: Object.keys(BoardIOEnum),
    },
    pin: {
      type: String,
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)
export const BoardIO: Model<IBoardIO> = mongoose.model('boardIO', schema)
