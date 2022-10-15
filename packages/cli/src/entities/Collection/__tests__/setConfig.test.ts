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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.setConfig", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("checks the current working directory for tenk.config.js", () => {
    mockedFsExistsSync.mockReturnValue(true);
    const mockedConfig: TenkConfig = {
      layers: {
        layer1: {
          mustAccompany: {
            "*": ["layer2"],
          },
        },
      },
    };
    collection.requireConfig = jest.fn().mockReturnValue(mockedConfig);
    collection.setConfig();
    expect(mockedFsExistsSync).toBeCalledWith("/test/tenk.config.js");
    expect(collection.requireConfig).toBeCalledTimes(1);
    expect(collection.config).toEqual(mockedConfig);
  });
});
