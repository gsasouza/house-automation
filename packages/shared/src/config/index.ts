import * as path from 'path'
import dotenvSafe from 'dotenv-safe'

const root = path.join.bind(this, __dirname, '../../../../')

dotenvSafe.load({
  allowEmptyValues: true,
  path: root('.env'),
  sample: root('.env.example')
})

export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/house-automation'
export const SERVER_PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV
export const JWT_SECRET = process.env.JWT_SECRET
export const PUBLISH_KEY = process.env.PUBLISH_KEY
export const SUBSCRIBE_KEY = process.env.SUBSCRIBE_KEY
export const SECRET_KEY = process.env.SECRET_KEY
export const LOCAL_PORT = process.env.LOCAL_PORT || 5000;
