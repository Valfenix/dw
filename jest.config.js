/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
