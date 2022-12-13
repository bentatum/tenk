import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const LayerFactory = () => container.get<Layer>("Layer");

describe("Layer.applyConfig", () => {
  let layer: Layer;
  beforeEach(() => {
    layer = LayerFactory();
  });

  describe("odds", () => {
    test("overwrite", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        odds: 0.4,
      });
      layer.odds = 0.2;
      layer.applyConfig();
      expect(layer.odds).toBe(0.4);
    });
    test("preserve", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        bypassDNA: true,
      });
      layer.odds = 0.2;
      layer.applyConfig();
      expect(layer.odds).toBe(0.2);
    });
  });

  describe("mustAccompany", () => {
    test("overwrite", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        mustAccompany: {
          "*": ["headwear"],
        },
      });
      layer.mustAccompany = {};
      layer.applyConfig();
      expect(layer.mustAccompany).toEqual({
        "*": ["headwear"],
      });
    });
    test("preserve", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        odds: 0.5,
      });
      layer.mustAccompany = {
        "*": ["headwear"],
      };
      layer.applyConfig();
      expect(layer.mustAccompany).toEqual({
        "*": ["headwear"],
      });
    });
  });

  describe("cannotAccompany", () => {
    test("overwrite", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        cannotAccompany: {
          "*": ["headwear"],
        },
      });
      layer.cannotAccompany = {};
      layer.applyConfig();
      expect(layer.cannotAccompany).toEqual({
        "*": ["headwear"],
      });
    });
    test("preserve", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        odds: 0.5,
      });
      layer.cannotAccompany = {
        "*": ["headwear"],
      };
      layer.applyConfig();
      expect(layer.cannotAccompany).toEqual({
        "*": ["headwear"],
      });
    });
  });

  describe("bypassDNA", () => {
    test("overwrite", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        bypassDNA: true,
      });
      layer.bypassDNA = false;
      layer.applyConfig();
      expect(layer.bypassDNA).toBe(true);
    });
    test("preserve", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        odds: 0.5,
      });
      layer.bypassDNA = true;
      layer.applyConfig();
      expect(layer.bypassDNA).toBe(true);
    });
  });

  describe("svgAttributes", () => {
    test("overwrite", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        svgAttributes: {
          style:
            "filter:drop-shadow(0 0.05px 0.19px rgb(0 0 0/0.1)) drop-shadow(0 0.05px 0.05px rgb(0 0 0/0.06))",
        },
      });
      layer.svgAttributes = undefined;
      layer.applyConfig();
      expect(layer.svgAttributes).toEqual(
        expect.objectContaining({
          style: expect.anything(),
        })
      );
    });
    test("preserve", () => {
      layer.getLayerConfig = jest.fn().mockReturnValue({
        odds: 0.5,
      });
      layer.svgAttributes = {
        style:
          "filter:drop-shadow(0 0.05px 0.19px rgb(0 0 0/0.1)) drop-shadow(0 0.05px 0.05px rgb(0 0 0/0.06))",
      };
      layer.applyConfig();
      expect(layer.svgAttributes).toEqual(
        expect.objectContaining({
          style: expect.anything(),
        })
      );
    });
  });
});
