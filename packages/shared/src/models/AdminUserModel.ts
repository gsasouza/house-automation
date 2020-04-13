import mongoose, { Document, Model } from 'mongoose';

import { hashPassword, authenticate, encryptPassword } from './utils';

export interface IAdminUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => Promise<string>;
}

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      hidden: true,
      required: true,
    },
  },
  { timestamps: true },
);

adminUserSchema.methods = {
  authenticate,
  encryptPassword,
};

adminUserSchema.pre<IAdminUser>('save', hashPassword);

export const AdminUserModel: Model<IAdminUser> = mongoose.model('adminUser', adminUserSchema);
