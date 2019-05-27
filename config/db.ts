import mongoose from 'mongoose'
import { DB_URL } from './index'

export const connect = (url = DB_URL, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
