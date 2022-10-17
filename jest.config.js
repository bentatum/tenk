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
      statements: 98,
      branches: 98,
      functions: 96,
      lines: 98,
    },
  },
};
