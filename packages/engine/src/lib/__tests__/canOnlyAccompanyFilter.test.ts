import { Layer } from"../../layer";
import { LayerElement } from "../../LayerElement";
import mustAccompanyFilter from "../mustAccompanyFilter";

describe("mustAccompanyFilter", () => {
  test("no mustAccompany", () => {
    const layer = new Layer({
      name: "Wristband",
      elements: [{ name: "Red" }],
    });
    const result = mustAccompanyFilter(layer, 0, [layer]);
    expect(result).toBeTruthy();
  });

  describe("element", () => {
    test("no match", () => {
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
        mustAccompany: ["Above head.Sun"],
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
      });
      headwearLayer.selectedElement = hat;

      const layers: Layer[] = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });

    test("exact match", () => {
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
        mustAccompany: ["Above head.Rain Cloud"],
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
      });
      headwearLayer.selectedElement = hat;

      const layers: Layer[] = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeTruthy();
    });

    test("regex match", () => {
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
        mustAccompany: ["Above head./Rain/"],
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [hat],
      });
      headwearLayer.selectedElement = hat;

      const layers: Layer[] = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeTruthy();
    });
  });

  describe("layer", () => {
    test("no match", () => {
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
        mustAccompany: { Hat: ["Above head.Sun"] },
      });
      headwearLayer.selectedElement = hat;

      const layers: Layer[] = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });

    test("exact match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const umbrellaHat = new LayerElement({
        name: "Umbrella hat",
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [umbrellaHat],
        mustAccompany: { [umbrellaHat.name]: ["Above head.Rain Cloud"] },
      });
      headwearLayer.selectedElement = umbrellaHat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeTruthy();
    });
    test("regex match", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });
      aboveHeadLayer.selectedElement = rainCloud;

      const umbrellaHat = new LayerElement({
        name: "Umbrella hat",
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [umbrellaHat],
        mustAccompany: { [umbrellaHat.name]: ["Above head./Cloud/"] },
      });
      headwearLayer.selectedElement = umbrellaHat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeTruthy();
    });
  });
});
