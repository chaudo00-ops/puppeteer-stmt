/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: './jest-environment.cjs',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^puppeteer-core/internal/(.*)$': 'puppeteer-core/lib/esm/puppeteer/$1',
    '^puppeteer-core$': 'puppeteer-core/lib/esm/puppeteer/puppeteer-core.js',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'node',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // The root directory for searching for modules
  roots: ['<rootDir>/src'],
};
