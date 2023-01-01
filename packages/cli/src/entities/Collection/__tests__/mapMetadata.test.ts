import { Collection } from "@/entities";
import { container } from "@/inversify.config";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.mapMetadata", () => {
  let collection: Collection;

  beforeEach(() => {
    collection = container.get<Collection>("Collection");
  });

  it("filters out invalid attributes", () => {
    const mockedMetadata = {
      attributes: [
        {
          trait_type: "Background",
          value: "Light Salmon",
        },
        {},
      ],
    };
    expect(
      collection.mapMetadata(mockedMetadata as any).attributes
    ).toHaveLength(1);
  });
});
