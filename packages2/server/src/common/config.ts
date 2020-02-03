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

export const GRAPHQL_PORT = envVar.get('GRAPHQL_PORT', '5001').asPortNumber();
export const MONGO_URL = envVar
  .get('MONGO_URL')
  .required()
  .asString();
export const JWT_SECRET = envVar
  .get('JWT_SECRET')
  .required()
  .asString();
