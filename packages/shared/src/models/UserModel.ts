import { IWorkspace } from './WorkspaceModel';

import mongoose, { Document, Model, Schema } from 'mongoose';
import { hashPassword, authenticate, encryptPassword } from './utils';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string[];
  workspace: IWorkspace;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => Promise<string>;
}

const userSchema = new mongoose.Schema(
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
    role: {
      type: [String],
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  },
  { timestamps: true },
);

userSchema.methods = {
  authenticate,
  encryptPassword,
};

userSchema.pre<IUser>('save', hashPassword);

export const User: Model<IUser> = mongoose.model('user', userSchema);
