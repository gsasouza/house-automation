const config = require('@housejs/babel');

module.exports = {
  ...config,
  ignore: [/node_modules\/(?!@house-js)/],
};
