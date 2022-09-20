module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
  // transform: {
  //   /* Use babel-jest to transpile tests with the next/babel preset
  //       https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
  //   '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  // },
  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // Module file extensions for importing
  // moduleFileExtensions: ['ts', 'js'],
  // testEnvironment: 'jsdom',
  // moduleNameMapper: {
  //   '^.+\\.module\\.(css)$': 'identity-obj-proxy',
  //   '@/(.*)$': '<rootDir>/src/$1',
  //   '@/components/(.*)': '<rootDir>/src/components/$1',
  //   '@/hooks/(.*)': '<rootDir>/src/hooks/$1',
  //   '@/lib/(.*)': '<rootDir>/src/lib/$1',
  // },
  // transformIgnorePatterns: [
  //   '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
  //   // '[/\\\\].next[/\\\\]',
  //   // '^.+\\.module\\.(css)$',
  // ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      lines: 2,
    },
  },
  coverageReporters: ["text-summary"],
};
