module.exports = {
  roots: ["<rootDir>"],
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      statements: 79,
      branches: 38,
      functions: 65,
      lines: 78,
    },
  },
  coverageReporters: ["text-summary"],
  moduleNameMapper: {
    "@/test/(.*)$": "<rootDir>/test/$1",
    "@/(.*)$": "<rootDir>/src/$1",
  },
};
