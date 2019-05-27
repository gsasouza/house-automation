import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  setting: {
    theme: string
    notifications: string
    compactMode: string
  }
  authenticate: (plainTextPassword: string) => boolean
  encryptPassword: (password: string | undefined) => Promise<string>
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      hidden: true,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
)

userSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, this.password)
  },
  encryptPassword(password: string) {
    return bcrypt.hash(password, 8)
  }
}

userSchema.pre<IUser>('save', function hashPassword(next) {
  if (this.isModified('password')) {
    if (this.password) {
      this.encryptPassword(this.password)
      .then((hash: string) => {
        this.password = hash
        next()
      })
      .catch((err: Error) => next(err))
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export const User: Model<IUser> = mongoose.model('user', userSchema)
