import { Collection } from "@/entities";
import { TenkConfig } from "@/interfaces";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import fs from "fs";

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.setConfig", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("checks for $cwd/tenk.config.js", () => {
    mockedFsExistsSync.mockReturnValue(true);
    collection.setConfig();
    expect(mockedFsExistsSync).toBeCalledWith("/test/tenk.config.js");
    expect(collection.config).toEqual(mockedConfig);
  });

  it("doesn't set config if it doesn't exist", () => {
    mockedFsExistsSync.mockReturnValue(false);
    collection.setConfig();
    expect(mockedFsExistsSync).toBeCalledWith("/test/tenk.config.js");
    expect(collection.config).toBeUndefined();
  });
});
