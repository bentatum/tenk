import { container } from "@/inversify.config";
import { Collection, Layer, Element } from "@/entities";

beforeEach(() => {
  jest.clearAllMocks();
});

const CollectionFactory = () => container.get<Collection>("Collection");
const LayerFactory = () => container.get<Layer>("Layer");
const ElementFactory = () => container.get<Element>("Element");

describe("Collection", () => {
  describe("options defaults", () => {
    let collection: Collection;
    beforeEach(() => {
      collection = CollectionFactory();
      collection.create([], {});
    });
    test("size", () => {
      expect(collection.size).toBe(10000);
    });
    test("duplicate threshold", () => {
      expect(collection.duplicateThreshold).toBe(100);
    });
    test("broken rule threshold", () => {
      expect(collection.brokenRuleThreshold).toBe(1000000);
    });
  });
  describe("options", () => {
    test("size", () => {
      const collection = CollectionFactory();
      collection.create([], { size: 10 });
      expect(collection.size).toBe(10);
    });
    test("duplicateThreshold", () => {
      const collection = CollectionFactory();
      collection.create([], { duplicateThreshold: 10 });
      expect(collection.duplicateThreshold).toBe(10);
    });
    test("brokenRuleThreshold", () => {
      const collection = CollectionFactory();
      collection.create([], { brokenRuleThreshold: 10 });
      expect(collection.brokenRuleThreshold).toBe(10);
    });
  });

  describe("filterByOdds", () => {
    it("should filter out layers with odds of 0", () => {
      const layer1 = LayerFactory().create({
        name: "layer1",
        odds: 0,
        elements: [],
      });
      const layer2 = LayerFactory().create({
        odds: 1,
        name: "layer2",
        elements: [],
      });
      const layer3 = LayerFactory().create({
        odds: 0.5,
        name: "layer3",
        elements: [],
      });
      const collection = CollectionFactory();
      const filteredLayers = collection.filterByOdds([layer1, layer2, layer3]);
      expect(filteredLayers.includes(layer1)).toBeFalsy();
    });
  });

  describe("throwIfLayersBreakRules", () => {
    it("should throw if a layer breaks a rule", () => {
      const layer1 = LayerFactory().create({
        name: "layer1",
        elements: [],
        cannotAccompany: {
          "*": ["layer2"],
        },
      });
      const layer2 = LayerFactory().create({
        name: "layer2",
        elements: [],
      });
      const collection = CollectionFactory();
      expect(() => {
        collection.throwIfLayersBreakRules([layer1, layer2]);
      }).toThrow();
    });
    it("should not throw if a layer does not break a rule", () => {
      const layer1 = LayerFactory().create({
        name: "layer1",
        elements: [],
        cannotAccompany: {
          "*": ["some other layer name"],
        },
      });
      const layer2 = LayerFactory().create({
        name: "layer2",
        elements: [],
      });
      const collection = CollectionFactory();
      expect(() => {
        collection.throwIfLayersBreakRules([layer1, layer2]);
      }).not.toThrow();
    });
  });

  describe("mapLayerAttributes", () => {
    it("should throw if there is no selected element", () => {
      const layer = LayerFactory().create({
        name: "test",
        elements: [],
      });
      const collection = CollectionFactory();
      expect(() => {
        collection.mapLayerAttributes(layer, [layer], "dna");
      }).toThrow();
    });
    it("should map metadata", () => {
      const metadata = {
        filePath: "/path/to/some/img.png",
        height: 100,
        width: 100,
        fileSize: 100,
      };
      const element = ElementFactory().create({
        name: "test",
        metadata,
      });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
      });
      const collection = CollectionFactory();
      layer.selectedElement = element;
      expect(collection.mapLayerAttributes(layer, [layer], "dna")).toEqual([
        expect.objectContaining({ metadata }),
      ]);
    });
    it("should call the attribute function with the correct arguments", () => {
      const attributeFn = jest.fn().mockImplementation(() => ({
        trait_type: "Suit",
        value: "Sleeveless",
      }));
      const element = ElementFactory().create({
        name: "test",
      });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
        attribute: attributeFn,
      });
      const collection = CollectionFactory();
      layer.selectedElement = element;
      expect(collection.mapLayerAttributes(layer, [layer], "dna").length).toBe(
        1
      );
      expect(attributeFn).toBeCalledWith(layer, [layer], "dna");
    });
    it("should support multiple attributes", () => {
      const attributeFn = jest.fn().mockImplementation(() => [
        {
          trait_type: "Suit",
          value: "Sleeveless",
        },
        {
          trait_type: "Suit Color",
          value: "Blue",
        },
      ]);
      const element = ElementFactory().create({
        name: "test",
      });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
        attribute: attributeFn,
      });
      const collection = CollectionFactory();
      layer.selectedElement = element;
      expect(collection.mapLayerAttributes(layer, [layer], "dna")).toHaveLength(
        2
      );
    });
    it("should convert null in a list", () => {
      const attributeFn = jest.fn().mockImplementation(() => [
        null,
        {
          trait_type: "Suit Color",
          value: "Blue",
        },
      ]);
      const metadata = {
        filePath: "/path/to/some/img.png",
        height: 100,
        width: 100,
        fileSize: 100,
      };
      const element = ElementFactory().create({
        name: "test",
        metadata,
      });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
        attribute: attributeFn,
      });
      const collection = CollectionFactory();
      layer.selectedElement = element;
      expect(collection.mapLayerAttributes(layer, [layer], "dna").length).toBe(
        2
      );
      expect(collection.mapLayerAttributes(layer, [layer], "dna")[0]).toEqual({
        metadata,
      });
    });
    it("should convert null", () => {
      const attributeFn = jest.fn().mockImplementation(() => null);
      const metadata = {
        filePath: "/path/to/some/img.png",
        height: 100,
        width: 100,
        fileSize: 100,
      };
      const element = ElementFactory().create({
        name: "test",
        metadata,
      });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
        attribute: attributeFn,
      });
      const collection = CollectionFactory();
      layer.selectedElement = element;
      expect(collection.mapLayerAttributes(layer, [layer], "dna").length).toBe(
        1
      );
      expect(collection.mapLayerAttributes(layer, [layer], "dna")[0]).toEqual({
        metadata,
      });
    });
  });

  describe("generateMetadata", () => {
    it("should retry if a rule is broken", () => {
      const blue = ElementFactory().create({
        name: "blue",
      });
      const red = ElementFactory().create({
        name: "red",
      });
      const background = LayerFactory().create({
        name: "background",
        elements: [blue, red],
      });

      const house = ElementFactory().create({
        name: "house",
      });
      const trees = ElementFactory().create({
        name: "trees",
      });
      const foreground = LayerFactory().create({
        name: "foreground",
        elements: [house, trees],
      });

      const collection = CollectionFactory();
      collection.getRenderableLayers = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      collection.getDna = jest.fn(() => "qwerty");
      collection.create([background, foreground], {
        brokenRuleThreshold: 10,
      });
      expect(collection.getRenderableLayers).toBeCalledTimes(11);
      expect(collection.getDna).not.toBeCalled();
    });
  });

  describe("collection with sublayers", () => {
    it("should list the sub layers after the parent", () => {
      const body = LayerFactory().create({
        name: "body",
        layers: [
          LayerFactory().create({
            name: "face",
            elements: [
              ElementFactory().create({
                name: "light",
              }),
              ElementFactory().create({
                name: "medium",
              }),
              ElementFactory().create({
                name: "dark",
              }),
            ],
          }),
          LayerFactory().create({
            name: "arms",
            elements: [
              ElementFactory().create({
                name: "light",
              }),
              ElementFactory().create({
                name: "medium",
              }),
              ElementFactory().create({
                name: "dark",
              }),
            ],
          }),
        ],
      });
      const lightBg = ElementFactory().create({
        name: "light",
      });
      const background = LayerFactory().create({
        name: "background",
        elements: [lightBg],
      });
      background.selectedElement = lightBg;
      const renderableLayers = CollectionFactory().getRenderableLayers(
        [background, body],
        1
      );
      expect(renderableLayers[0].name).toBe("background");
      expect(renderableLayers[1].name).toBe("face");
      expect(renderableLayers[2].name).toBe("arms");
    });
  });

  describe("modifyLayers", () => {
    it("should call modifyLayers", () => {
      const element = ElementFactory().create({
        name: "test",
      });
      const layer1 = LayerFactory().create({
        name: "layer1",
        elements: [element],
      });
      const layer2 = LayerFactory().create({
        name: "layer2",
        elements: [element],
      });
      const layer3 = LayerFactory().create({
        odds: 0,
        name: "layer3",
        elements: [element],
      });
      layer1.selectedElement = element;
      layer2.selectedElement = element;
      const allLayers = [layer1, layer2, layer3];
      const renderableLayers = [layer1, layer2];
      const collection = CollectionFactory();
      const modifyLayers = jest.fn().mockReturnValue([layer1, layer2]);
      collection.create(allLayers, { modifyLayers });
      expect(modifyLayers).toBeCalledWith(renderableLayers, 1, allLayers);
    });
  });

  describe("modifyMetadata", () => {
    it("should call modifyMetadata", () => {
      const element = ElementFactory().create({
        name: "test",
      });
      const layer1 = LayerFactory().create({
        name: "layer1",
        elements: [element],
      });
      const layer2 = LayerFactory().create({
        name: "layer2",
        elements: [element],
      });
      const layer3 = LayerFactory().create({
        odds: 0,
        name: "layer3",
        elements: [element],
      });
      layer1.selectedElement = element;
      layer2.selectedElement = element;
      const allLayers = [layer1, layer2, layer3];
      const renderableLayers = [layer1, layer2];
      const collection = CollectionFactory();
      const modifyMetadata = jest.fn().mockReturnValue({});
      collection.create(allLayers, { modifyMetadata });
      expect(modifyMetadata).toBeCalledWith(
        0,
        expect.any(Array),
        renderableLayers,
        expect.any(String)
      );
    });
  });

  describe("disable dna", () => {
    it("should not use dna", () => {
      const element = ElementFactory().create({
        name: "test",
      });
      const layer1 = LayerFactory().create({
        name: "layer1",
        elements: [element],
      });
      const layers = [layer1];
      const collection = CollectionFactory();
      collection.getDna = jest.fn();
      collection.create(layers, { disableDna: true });
      expect(collection.getDna).not.toBeCalled();
    });
  });
});
