import mongoose, { ConnectOptions } from 'mongoose'

const DB_URL = process.env.DB_URL || 'mongodb://mongo:27017/house-automation'

export const connect = (url: string = DB_URL, opts: ConnectOptions = {}) => {
  console.log(DB_URL)
  return mongoose.connect(url, { ...opts })
}
