const nextJest = require("next/jest")

const createJestConfig = nextJest({
	dir: "./"
})

/** @type {import("jest").Config} */
const config ={
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
};


module.exports = createJestConfig(config)