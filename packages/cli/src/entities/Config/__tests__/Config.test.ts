import fs from "fs";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import { Config } from "../Config";
import { TenkJsonConfig } from "@/interfaces";

jest.mock("@/env", () => ({
  configPath: "/test/tenk.config.js",
}));

jest.mock("fs");
const mockedFsExistsSync = createMock(fs.existsSync);

const mockedConfig: TenkJsonConfig = {
  layers: {
    layer1: {
      mustAccompany: {
        "*": ["layer2"],
      },
    },
  },
};
jest.mock("/test/tenk.config.js", () => mockedConfig, { virtual: true });

const ConfigFactory = () => container.get<Config>("Config");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Config", () => {
  describe("constructor", () => {
    it("does not throw error if config file does not exist", () => {
      mockedFsExistsSync.mockReturnValue(false);
      expect(() => ConfigFactory()).not.toThrow();
    });

    it("does not throw error if config file exists", () => {
      mockedFsExistsSync.mockReturnValue(true);
      expect(() => ConfigFactory()).not.toThrow();
    });
  });

  describe("get", () => {
    it("returns the config value for the given key", () => {
      const config = ConfigFactory();
      expect(config.get("layers")).toEqual(mockedConfig.layers);
    });

    it("returns undefined if the key does not exist", () => {
      const config = ConfigFactory();
      expect(config.get("nonExistentKey")).toBeUndefined();
    });
  });
});
