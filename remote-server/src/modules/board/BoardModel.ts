import mongoose, { Document, Model, Schema } from 'mongoose'

export enum BoardsEnum {
  RASPBERRY = 'RASPBERRY',
  ARDUINO = 'ARDUINO',
  ESP8266 = 'ESP8266'
}

export interface IBoard extends Document {
  name: string
  type: BoardsEnum
  host?: string
  port?: boolean
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
      enum: Object.keys(BoardsEnum),
    },
    host: {
      type: String,
    },
    port: {
      type: String,
    },
    connected: {
      type: Boolean,
      required: true,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)
export const Board: Model<any> = mongoose.model('board', schema)
