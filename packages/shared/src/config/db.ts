import mongoose from 'mongoose'
import { DB_URL } from '.'

export const connect = (url: string = DB_URL, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
