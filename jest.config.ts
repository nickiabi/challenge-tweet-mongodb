import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  // globalTeardown: "./jest.globalTeardown.ts",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;
