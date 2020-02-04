import path from 'path';

import dotenvSafe from 'dotenv-safe';
import envVar from 'env-var';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  allowEmptyValues: process.env.NODE_ENV !== 'production',
  path: root('.env'),
  sample: root('.env.example'),
});

export const MONGO_URL = envVar
  .get('MONGO_URL')
  .required()
  .asString();

export const LOCAL_PORT = envVar
  .get('LOCAL_PORT')
  .required()
  .asString();

export const PUBNUB_CREDENTIALS = {
  subscribeKey: envVar
    .get('SUBSCRIBE_KEY')
    .required()
    .asString(),
  publishKey: envVar
    .get('SUBSCRIBE_KEY')
    .required()
    .asString(),
  secretKey: envVar
    .get('SECRET_KEY')
    .required()
    .asString(),
};
