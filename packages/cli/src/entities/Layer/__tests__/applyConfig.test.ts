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
      layer.odds = 0.2;
      layer.applyConfig({
        odds: 0.4,
      });
      expect(layer.odds).toBe(0.4);
    });
    test("preserve", () => {
      layer.odds = 0.2;
      layer.applyConfig({
        bypassDNA: true,
      });
      expect(layer.odds).toBe(0.2);
    });
  });

  describe("mustAccompany", () => {
    test("overwrite", () => {
      layer.mustAccompany = {};
      layer.applyConfig({
        mustAccompany: {
          "*": ["headwear"],
        },
      });
      expect(layer.mustAccompany).toEqual({
        "*": ["headwear"],
      });
    });
    test("preserve", () => {
      layer.mustAccompany = {
        "*": ["headwear"],
      };
      layer.applyConfig({
        odds: 0.5,
      });
      expect(layer.mustAccompany).toEqual({
        "*": ["headwear"],
      });
    });
  });

  describe("cannotAccompany", () => {
    test("overwrite", () => {
      layer.cannotAccompany = {};
      layer.applyConfig({
        cannotAccompany: {
          "*": ["headwear"],
        },
      });
      expect(layer.cannotAccompany).toEqual({
        "*": ["headwear"],
      });
    });
    test("preserve", () => {
      layer.cannotAccompany = {
        "*": ["headwear"],
      };
      layer.applyConfig({
        odds: 0.5,
      });
      expect(layer.cannotAccompany).toEqual({
        "*": ["headwear"],
      });
    });
  });

  describe("bypassDNA", () => {
    test("overwrite", () => {
      layer.bypassDNA = false;
      layer.applyConfig({
        bypassDNA: true,
      });
      expect(layer.bypassDNA).toBe(true);
    });
    test("preserve", () => {
      layer.bypassDNA = true;
      layer.applyConfig({
        odds: 0.5,
      });
      expect(layer.bypassDNA).toBe(true);
    });
  });

  describe("svgAttributes", () => {
    test("overwrite", () => {
      layer.svgAttributes = undefined;
      layer.applyConfig({
        svgAttributes: {
          style:
            "filter:drop-shadow(0 0.05px 0.19px rgb(0 0 0/0.1)) drop-shadow(0 0.05px 0.05px rgb(0 0 0/0.06))",
        },
      });
      expect(layer.svgAttributes).toEqual(
        expect.objectContaining({
          style: expect.anything(),
        })
      );
    });
    test("preserve", () => {
      layer.svgAttributes = {
        style:
          "filter:drop-shadow(0 0.05px 0.19px rgb(0 0 0/0.1)) drop-shadow(0 0.05px 0.05px rgb(0 0 0/0.06))",
      }
      layer.applyConfig({
        odds: 0.5
      });
      expect(layer.svgAttributes).toEqual(
        expect.objectContaining({
          style: expect.anything(),
        })
      );
    });
  });
});
