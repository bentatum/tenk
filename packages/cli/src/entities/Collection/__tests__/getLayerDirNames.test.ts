import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import fs from "fs";

jest.mock("@/env", () => ({
  layersDir: "/layers",
}));

jest.mock("fs");
const mockedFsReaddirSync = createMock(fs.readdirSync);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.getLayerDirNames", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("gets the layer directory names", () => {
    mockedFsReaddirSync.mockReturnValue([
      {
        name: "Background",
        isDirectory: () => true,
      },
      {
        name: "Foreground",
        isDirectory: () => true,
      },
    ] as any);
    const result = collection.getLayerDirNames();
    expect(mockedFsReaddirSync).toBeCalledWith("/layers", {
      withFileTypes: true,
    });
    expect(result).toEqual(["Background", "Foreground"]);
  });

  it("logs an error and exits if the layers directory is missing", () => {
    mockedFsReaddirSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });
    const logSpy = jest.spyOn(console, "warn").mockImplementation();
    collection.getLayerDirNames();
    expect(mockedFsReaddirSync).toBeCalledWith("/layers", {
      withFileTypes: true,
    });
    expect(logSpy).toBeCalledWith(
      "No layers directory found. Please create one."
    );
    expect(process.exitCode).toBe(1);
  });
});
