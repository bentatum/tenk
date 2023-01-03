import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import fs from "fs";

jest.mock("@/env", () => ({
  configPath: "/test/tenk.config.js",
}));

jest.mock("fs");
const mockedFsWriteFileSync = createMock(fs.writeFileSync);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.writeCollectionJson", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("writes the collection json file with values from the config", () => {
    mockedFsWriteFileSync.mockReturnValue();

    const name = "Tenk";
    const symbol = "TENK";
    const description = "Tenk is a collection of 10,000 NFTs";
    const image = "https://tenk.io/tenk.png";

    collection.config.set({
      name,
      symbol,
      description,
      image,
    });

    collection.writeCollectionJson();

    expect(mockedFsWriteFileSync).toBeCalledWith(
      expect.stringContaining("collection.json"),
      JSON.stringify({
        name,
        symbol,
        description,
        image,
        attributes: [],
        properties: {
          files: [
            {
              uri: image,
              type: "image/png",
            },
          ],
        },
      })
    );
  });

  it("should default the image extension to png if there is no collection image defined", () => {
    mockedFsWriteFileSync.mockReturnValue();

    collection.writeCollectionJson();

    expect(mockedFsWriteFileSync).toBeCalledWith(
      expect.stringContaining("collection.json"),
      expect.stringContaining("image/png")
    );
  });

  it("should use svg as the image extension if the collection image is an svg", () => {
    collection.config.set({
      image: "https://tenk.io/tenk.svg",
    });

    collection.writeCollectionJson();

    expect(mockedFsWriteFileSync).toBeCalledWith(
      expect.stringContaining("collection.json"),
      expect.stringContaining("image/svg+xml")
    );
  });
});
