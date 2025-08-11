import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
   dir: "./",
});

const config: Config = {
   clearMocks: true,
   collectCoverage: true,
   coverageDirectory: "coverage",
   moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
   },
   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
   testEnvironment: "jsdom",
   testMatch: ["**/__tests__/**/*.?([mc])[jt]s?(x)"],
};

module.exports = async () => ({
   ...(await createJestConfig(config)()),
   transformIgnorePatterns: ["node_modules/(?!next-intl)/"],
});
