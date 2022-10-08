import { Layer } from "../../layer";
import { LayerElement } from "../../LayerElement";
import mustAccompanyFilter from "../mustAccompanyFilter";

describe("mustAccompanyFilter", () => {
  it("should return true if there is no selected element", () => {
    const layer = new Layer({
      name: "test",
      elements: [],
      mustAccompany: { "*": ["/background/"] },
    });
    expect(mustAccompanyFilter(layer, 0, [layer])).toBe(true);
  });

  it("should return true if there are no rules defined", () => {
    const elements = [new LayerElement({ name: "Red" })];
    const layer = new Layer({
      name: "Wristband",
      elements,
    });
    layer.selectedElement = elements[0];
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
        mustAccompany: { Hat: ["above head.sun"] },
      });
      headwearLayer.selectedElement = hat;

      const layers: Layer[] = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
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

      const umbrellaHat = new LayerElement({
        name: "Umbrella hat",
      });
      const headwearLayer = new Layer({
        name: "Headwear",
        elements: [umbrellaHat],
        mustAccompany: { "*": ["above head"] },
      });
      headwearLayer.selectedElement = umbrellaHat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeTruthy();
    })

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

    test("match, but no selected element", () => {
      const rainCloud = new LayerElement({
        name: "Rain Cloud",
      });
      const aboveHeadLayer = new Layer({
        name: "Above head",
        elements: [rainCloud],
      });

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
      expect(result).toBeFalsy();
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
        mustAccompany: { [umbrellaHat.name]: ["above head./cloud/"] },
      });
      headwearLayer.selectedElement = umbrellaHat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeTruthy();
    });

    test("regex no match", () => {
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
        mustAccompany: { [umbrellaHat.name]: ["above head./sun/"] },
      });
      headwearLayer.selectedElement = umbrellaHat;

      const layers = [aboveHeadLayer, headwearLayer];
      const result = mustAccompanyFilter(headwearLayer, 0, layers);
      expect(result).toBeFalsy();
    });

    test("key regex match", () => {
      const cyclopsPupil = new LayerElement({
        name: "Cyclops Big",
      });
      const pupils = new Layer({
        name: "Pupils",
        elements: [cyclopsPupil],
      });
      pupils.selectedElement = cyclopsPupil;

      const cyclopsEyeWhites = new LayerElement({
        name: "Big Cyclops",
      });
      const eyeWhites = new Layer({
        name: "Headwear",
        elements: [cyclopsEyeWhites],
        mustAccompany: { ["/cyclops/"]: ["pupils./cyclops/"] },
      });
      eyeWhites.selectedElement = cyclopsEyeWhites;

      const layers = [eyeWhites, pupils];
      const result = mustAccompanyFilter(eyeWhites, 0, layers);
      expect(result).toBeTruthy();
    });

    test("key regex no match", () => {
      const regularPupil = new LayerElement({
        name: "Regular",
      });
      const pupils = new Layer({
        name: "Pupils",
        elements: [regularPupil],
      });
      pupils.selectedElement = regularPupil;

      const cyclopsEyeWhites = new LayerElement({
        name: "Big Cyclops",
      });
      const eyeWhites = new Layer({
        name: "Headwear",
        elements: [cyclopsEyeWhites],
        mustAccompany: { ["/cyclops/"]: ["pupils./cyclops/"] },
      });
      eyeWhites.selectedElement = cyclopsEyeWhites;

      const layers = [eyeWhites, pupils];
      const result = mustAccompanyFilter(eyeWhites, 0, layers);
      expect(result).toBeFalsy();
    });
  });
});
