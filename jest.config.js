const path = require('path');

module.exports = {
  roots: ['<rootDir>/dist/src'],
  testMatch: ['**/__tests__/**/*.+(jsx|js)', '**/?(*.)+(spec|test).+(jsx|js)'],
  moduleNameMapper: {
    '^@frontend/(.+)': '<rootDir>/dist/src/$1',
    '\\.(css|less|scss|sass)$': path.resolve(__dirname, './dist/src/supports/__mocks__/styleMock.js'),
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotResolver: '<rootDir>/snapshotResolver.js',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
