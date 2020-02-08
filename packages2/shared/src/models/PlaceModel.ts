import mongoose, { Document, Model } from 'mongoose';

export interface IPlace extends Document {
  name: string;
  reference: string;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    reference: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);
export const Place: Model<IPlace> = mongoose.model('place', schema);
