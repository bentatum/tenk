const base = require("./jest.config.base.js");

module.exports = {
  ...base,
  projects: ["<rootDir>/packages/*/jest.config.js"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["json-summary", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 94,
      branches: 96,
      functions: 88,
      lines: 94,
    },
  },
};
