import bcrypt from 'bcrypt';
import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
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
    password: {
      type: String,
      hidden: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hash(password, 8);
  },
};

userSchema.pre<IUser>('save', function hashPassword(next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  this.encryptPassword(this.password)
    .then((hash: string) => {
      this.password = hash;
      next();
    })
    .catch((err: Error) => next(err));
});

export const User: Model<IUser> = mongoose.model('user', userSchema);
