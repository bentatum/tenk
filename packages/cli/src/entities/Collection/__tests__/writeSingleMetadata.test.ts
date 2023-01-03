import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import fs from "fs";

jest.mock("fs");
const mockedFsWriteFileSync = createMock(fs.writeFileSync);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.writeMetadataJson", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("writes metadata file and removes metadata key", () => {
    mockedFsWriteFileSync.mockReturnValue();
    const mockedMetadata = {
      name: "0",
      dna: "test",
      attributes: [
        {
          trait_type: "Background",
          value: "Light Salmon",
          metadata: {
            height: 100,
            width: 100,
          },
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
    };
    collection.writeSingleMetadata(mockedMetadata, 0);
    expect(mockedFsWriteFileSync).toBeCalledWith(
      expect.stringContaining('0.json'),
      expect.not.stringContaining("metadata")
    );
  });
});
