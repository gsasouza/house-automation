module.exports = {
  projects: [
    // '<rootDir>/packages/console/jest.config.js',
    '<rootDir>/packages/server/jest.config.js',
    // '<rootDir>/packages/web/jest.config.js',
    '<rootDir>/packages/shared/jest.config.js',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require('path').resolve('./test/babelTransformer'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
