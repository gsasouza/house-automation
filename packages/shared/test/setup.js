/* eslint-disable no-console */
const path = require('path');

const pkg = require('../package');

module.exports = () => {
  console.log(`\n# ${pkg.name.toUpperCase()} TEST SETUP #`);

  // normalize timezone to UTC
  process.env.TZ = 'UTC';
  process.env.NODE_ENV = 'test';

  // fix dotenv-safe loading of example by setting the cwd
  process.chdir(path.resolve(path.join(__dirname, '..')));
};
