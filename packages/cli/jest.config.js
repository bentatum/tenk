module.exports = {
  roots: ["<rootDir>"],
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      statements: 64,
      branches: 11,
      functions: 46,
      lines: 63,
    },
  },
  coverageReporters: ["text-summary"],
  moduleNameMapper: {
    "@/test/(.*)$": "<rootDir>/test/$1",
    "@/(.*)$": "<rootDir>/src/$1",
  },
};
