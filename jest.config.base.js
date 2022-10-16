module.exports = {
  roots: ["<rootDir>"],
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
  moduleNameMapper: {
    "@/test/(.*)$": "<rootDir>/test/$1",
    "@/(.*)$": "<rootDir>/src/$1",
  }
};
