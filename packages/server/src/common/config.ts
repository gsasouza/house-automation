import path from 'path';

import dotenvSafe from 'dotenv-safe';
import envVar from 'env-var';

const cwd = process.cwd();

const root = path.join.bind(cwd);

const isProduction = process.env.NODE_ENV === 'production';
dotenvSafe.config({
  allowEmptyValues: !isProduction,
  path: root('.env'),
  sample: root('.env.example'),
});

export const GRAPHQL_PORT = envVar
  .get('GRAPHQL_PORT')
  .default(5001)
  .asPortNumber();
export const MONGO_URL = envVar
  .get('MONGO_URL')
  .required(isProduction)
  .asString();

export const JWT_SECRET = envVar
  .get('JWT_SECRET')
  .default('SECRET')
  .required(isProduction)
  .asString();

export const PUBNUB_CREDENTIALS = {
  subscribeKey: envVar
    .get('SUBSCRIBE_KEY')
    .required(isProduction)
    .asString(),
  publishKey: envVar
    .get('SUBSCRIBE_KEY')
    .required(isProduction)
    .asString(),
  secretKey: envVar
    .get('SECRET_KEY')
    .required(isProduction)
    .asString(),
};
