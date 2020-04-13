import mongoose, { Document, Model } from 'mongoose';

import { IAdminUser } from './AdminUserModel';

export interface IWorkspace extends Document {
  name: string;
  reference: string;
  createdBy: IAdminUser;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Workspace: Model<IWorkspace> = mongoose.model('place', schema);
