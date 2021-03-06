import mongoose, { Document, Model } from 'mongoose'

export enum RoomsEnum {
  KITCHEN = 'KITCHEN',
  BEDROOM = 'BEDROOM',
  BATHROOM = 'BATHROOM',
  LIVING_ROOM = 'LIVING_ROOM'
}

export interface IRoom extends Document {
  name: string
  type: RoomsEnum
  createdBy: string
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
      enum: Object.keys(RoomsEnum),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
)
export const Room: Model<IRoom> = mongoose.model('room', schema)
