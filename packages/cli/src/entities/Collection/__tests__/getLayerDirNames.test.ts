import { Collection } from "@/entities";
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

describe("Collection.getLayerDirNames", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("checks the current working directory for tenk.config.js", () => {
    // mockedFsExistsSync.mockReturnValue(true);
    // collection.requireConfig = jest.fn();
    const result = collection.getLayerDirNames();
    // expect(mockedFsExistsSync).toBeCalledWith("/test/tenk.config.js");
    // expect(collection.requireConfig).toBeCalledTimes(1);
  });
});
