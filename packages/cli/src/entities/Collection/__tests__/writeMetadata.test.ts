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

describe("Collection.writeMetadata", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("writes metadata file and removes dna attribute", () => {
    mockedFsWriteFileSync.mockReturnValue();
    const mockedMetadata = [
      {
        name: "0",
        dna: "test",
        attributes: [
          {
            trait_type: "Background",
            value: "Light Salmon",
          },
          {
            trait_type: "Body",
            value: "Medium",
          },
          {
            trait_type: "Eye whites",
            value: "Smol",
          },
          {
            trait_type: "Hair",
            value: "Buzzcut",
          },
          {
            trait_type: "Headwear",
            value: "Cap",
          },
          {
            trait_type: "Pupils",
            value: "Left",
          },
          {
            trait_type: "Legs",
            value: "Red Pants.svg",
          },
          {
            trait_type: "Mouth",
            value: "Rainbow Puke",
          },
        ],
      },
    ];
    collection.writeMetadata(mockedMetadata);
    expect(mockedFsWriteFileSync).toBeCalledWith(
      expect.stringContaining("metadata.json"),
      expect.not.stringContaining("dna")
    );
  });
});
