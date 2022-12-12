import fs from "fs";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import { Config } from "../Config";
import { TenkConfig } from "@/interfaces";

jest.mock("@/env", () => ({
  configPath: "/test/tenk.config.js",
}));

jest.mock("fs");
const mockedFsExistsSync = createMock(fs.existsSync);

const mockedConfig: TenkConfig = {
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
    it("throws error if config not initialized", () => {
      const config = ConfigFactory();
      config._config = undefined;
      expect(() => config.get("test")).toThrow();
    });
    it("returns value if config initialized", () => {
      const config = ConfigFactory();
      const layersConfig = { test: { odds: 0.5 } };
      config._config = {
        layers: layersConfig,
      };
      expect(config.get("layers")).toEqual(layersConfig);
    });
  });
});
