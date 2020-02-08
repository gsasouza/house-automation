import bcrypt from 'bcrypt';
import mongoose, { Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
  name: string;
  adminUsername: string;
  password: string;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => Promise<string>;
}

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adminUsername: {
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
  authenticate(plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hash(password, 8);
  },
};

adminUserSchema.pre<IAdminUser>('save', function hashPassword(next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  this.encryptPassword(this.password)
    .then((hash: string) => {
      this.password = hash;
      next();
    })
    .catch((err: Error) => next(err));
});

export const AdminUser: Model<IAdminUser> = mongoose.model('adminUser', adminUserSchema);
