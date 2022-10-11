module.exports = {
  roots: ["<rootDir>"],
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 82,
      functions: 94,
      lines: 89,
    },
  },
  coverageReporters: ["text-summary"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
};
