import { Layer } from "@/Layer";
import { LayerElement } from "@/LayerElement";
import cannotAccompanyFilter from "../cannotAccompanyFilter";

describe("cannotAccompanyFilter", () => {
  describe("layer", () => {
    test("element exact match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const hat = new LayerElement({
        name: "Hat",
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
        cannotAccompany: { Hat: ["Above head.Rain Cloud"] },
      });
      headwearLayer.selectedElement = hat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = cannotAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });

    test("element regex match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const hat = new LayerElement({
        name: "Hat",
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
        cannotAccompany: { Hat: ["Above head./Rain/"] },
      });
      headwearLayer.selectedElement = hat;

      const layers: Layer[] = [aboveHeadLayer, headwearLayer];
      const result = cannotAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });

    test("layer match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const hat = new LayerElement({
        name: "Hat",
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
        cannotAccompany: { Hat: ["Above head"] },
      });
      headwearLayer.selectedElement = hat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = cannotAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });
  });

  describe("element", () => {
    test("element exact match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const hat = new LayerElement({
        name: "Hat",
        cannotAccompany: ["Above head.Rain Cloud"],
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
      });
      headwearLayer.selectedElement = hat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = cannotAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });
    test("element regex match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const hat = new LayerElement({
        name: "Hat",
        cannotAccompany: ["Above head./Rain/"],
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
      });
      headwearLayer.selectedElement = hat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = cannotAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });
    test("layer match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const hat = new LayerElement({
        name: "Hat",
        cannotAccompany: ["Above head"],
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
      });
      headwearLayer.selectedElement = hat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = cannotAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });
  });
});
