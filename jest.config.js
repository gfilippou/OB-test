module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsDom',
  testMatch: [`<rootDir>/test/*.test.(ts|tsx)`],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  },
  roots: [
    "<rootDir>",
  ],
  modulePaths: [
    "<rootDir>",
  ],
  moduleDirectories: [
    "node_modules"
  ],
};
