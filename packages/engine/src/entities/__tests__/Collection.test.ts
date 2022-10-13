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
        collection.mapLayerAttributes(layer);
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
      expect(collection.mapLayerAttributes(layer)).toEqual(
        expect.objectContaining({ metadata })
      );
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
});
