import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import fs from "fs";

jest.mock("@/env", () => ({
  buildDir: "/test/build/dir",
}));

jest.mock("fs");
const mockedFsExistsSync = createMock(fs.existsSync);
const mockedFsRmSync = createMock(fs.rmSync);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.setupWorkspace", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("checks if the build directory exists", () => {
    collection.setupWorkspace();
    expect(mockedFsExistsSync).toHaveBeenCalledWith("/test/build/dir");
  });

  it("will remove the directory if it already exists", () => {
    mockedFsExistsSync.mockReturnValue(true);
    collection.setupWorkspace();
    expect(mockedFsRmSync).toBeCalledWith("/test/build/dir", {
      recursive: true,
    });
  });

  it("should not remove the directory if it does not exist", () => {
    mockedFsExistsSync.mockReturnValue(false);
    collection.setupWorkspace();
    expect(mockedFsRmSync).not.toBeCalled();
  });

  it("will create a fresh directory structure", () => {
    mockedFsExistsSync.mockReturnValue(false);
    collection.setupWorkspace();
    expect(fs.mkdirSync).toBeCalledTimes(2);
  });
});
