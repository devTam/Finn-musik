module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
  ],
  moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__test__/mock/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/src/__test__/mock/styleMock.ts",
  },
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./**/*.{js,jsx,ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
