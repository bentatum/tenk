import { Collection } from "../Collection";
import { LayerConfig, LayerElementConfig } from "../types";

jest.mock(
  "../lib/sha256",
  jest.fn(() => ({
    default: jest.fn((message: string = "") => {
      const shajs = require("sha.js");
      return shajs("sha256").update(message).digest("hex");
    }),
  }))
);

describe("Collection", () => {
  test("empty configuration", () => {
    const collection = new Collection([]);
    expect(Array.isArray(collection.getMetadata())).toEqual(true);
  });

  test("single layer configuration", () => {
    const collection = new Collection([
      {
        name: "Background",
        elements: [
          {
            name: "Red",
          },
          {
            name: "Green",
          },
          {
            name: "Yellow",
          },
          {
            name: "Blue",
          },
        ],
      },
    ]);
    expect(collection.getMetadata().length).toBe(4);
  });

  test("basic configuration", () => {
    const collection = new Collection([
      {
        name: "Background",
        elements: [
          {
            name: "Red",
          },
          {
            name: "Green",
          },
          {
            name: "Yellow",
          },
          {
            name: "Blue",
          },
        ],
      },
      {
        name: "Landscape",
        elements: [
          {
            name: "Mountainous",
          },
          {
            name: "Green pastures",
          },
          {
            name: "Desert",
          },
          {
            name: "Ocean",
          },
        ],
      },
    ]);
    const metadata = collection.getMetadata();
    expect(metadata.length).toBe(4 * 4);
  });

  describe("recursive sub layers", () => {
    let collection: Collection;

    beforeEach(() => {
      const hat: LayerElementConfig = {
        name: "Hat",
        layers: [
          {
            name: "Hat color",
            elements: [
              {
                name: "Red",
              },
              {
                name: "Green",
              },
              {
                name: "Blue",
                layers: [
                  {
                    name: "Hat type",
                    elements: [
                      {
                        name: "Dad hat",
                      },
                      {
                        name: "Baseball cap",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const layers: LayerConfig[] = [
        {
          name: "Headwear",
          elements: [hat],
        },
      ];
      collection = new Collection(layers);
    });

    test("length", () => {
      const metadata = collection.getMetadata();
      expect(metadata.length).toBe(4);
    });
  });

  describe("filters", () => {
    describe("layer filters", () => {
      test("cannot accompany filter", () => {
        const collection = new Collection([
          {
            name: "Headwear",
            elements: [
              {
                name: "Hat",
              },
              {
                name: "Mask",
              },
            ],
          },
          {
            name: "Eyewear",
            cannotAccompany: {
              Glasses: ["Headwear.Mask"],
            },
            elements: [
              {
                name: "Glasses",
              },
              {
                name: "Contact lenses",
              },
            ],
          },
        ]);

        const metadata = collection.getMetadata();

        const test = metadata.every(
          ({ attributes }) =>
            !(
              attributes.find(
                (x) => x.trait_type === "Eyewear" && x.value === "Glasses"
              ) &&
              attributes.find(
                (x) => x.trait_type === "Headwear" && x.value === "Mask"
              )
            )
        );

        expect(test).toBe(true);
      });

      test("must accompany filter", () => {
        const collection = new Collection([
          {
            name: "Eyes",
            elements: [
              {
                name: "Normal",
              },
              {
                name: "Cyclops",
              },
            ],
          },
          {
            name: "Eyewear",
            mustAccompany: {
              "Eye patch": ["Eyes.Normal"],
            },
            elements: [
              {
                name: "Eye patch",
              },
              {
                name: "Contact lenses",
              },
            ],
          },
        ]);

        const metadata = collection.getMetadata();

        const test = metadata.every(
          ({ attributes }) =>
            !(
              attributes.find(
                (x) => x.trait_type === "Eyes" && x.value === "Cyclops"
              ) &&
              attributes.find(
                (x) => x.trait_type === "Eyewear" && x.value === "Eye patch"
              )
            )
        );

        expect(test).toBe(true);
      });
    });
    describe("element filters", () => {
      test("cannot accompany filter", () => {
        const collection = new Collection([
          {
            name: "Headwear",
            elements: [
              {
                name: "Hat",
              },
              {
                name: "Mask",
              },
            ],
          },
          {
            name: "Eyewear",
            elements: [
              {
                name: "Glasses",
                cannotAccompany: ["Headwear.Mask"],
              },
              {
                name: "Contact lenses",
              },
            ],
          },
        ]);

        const metadata = collection.getMetadata();

        const test = metadata.every(
          ({ attributes }) =>
            !(
              attributes.find(
                (x) => x.trait_type === "Eyewear" && x.value === "Glasses"
              ) &&
              attributes.find(
                (x) => x.trait_type === "Headwear" && x.value === "Mask"
              )
            )
        );

        expect(test).toBe(true);
      });

      test("must accompany filter", () => {
        const collection = new Collection([
          {
            name: "Eyes",
            elements: [
              {
                name: "Normal",
              },
              {
                name: "Cyclops",
              },
            ],
          },
          {
            name: "Eyewear",
            elements: [
              {
                name: "Eye patch",
                mustAccompany: ["Eyes.Normal"],
              },
              {
                name: "Contact lenses",
              },
            ],
          },
        ]);

        const metadata = collection.getMetadata();

        const test = metadata.every(
          ({ attributes }) =>
            !(
              attributes.find(
                (x) => x.trait_type === "Eyes" && x.value === "Cyclops"
              ) &&
              attributes.find(
                (x) => x.trait_type === "Eyewear" && x.value === "Eye patch"
              )
            )
        );

        expect(test).toBe(true);
      });
    });
  });
});
