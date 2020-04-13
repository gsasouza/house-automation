const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTestFramework.js'],
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  resetModules: false,
  reporters: ['default'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
};
