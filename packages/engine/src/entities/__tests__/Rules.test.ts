import "@/test/mocks/sha256";
import { container } from "@/inversify.config";
import { Rules, Layer, Element } from "@/entities";

const LayerFactory = () => container.get<Layer>("Layer");
const ElementFactory = () => container.get<Element>("Element");

const rules = container.get<Rules>("Rules");

describe("Rules", () => {
  describe("getRulesFromLayer", () => {
    it("should return rules from layer", () => {
      const layer = LayerFactory().create({
        name: "test",
        elements: [],
        cannotAccompany: { "*": ["another layer.element"] },
      });
      const rulesFromLayer = rules.getRulesFromLayer(layer, "cannotAccompany");
      expect(rulesFromLayer).toEqual(["another layer.element"]);
    });

    test("element name key", () => {
      const element = ElementFactory().create({ name: "element" });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
        cannotAccompany: { element: ["another layer.element"] },
      });
      layer.selectedElement = element;
      const rulesFromLayer = rules.getRulesFromLayer(layer, "cannotAccompany");
      expect(rulesFromLayer).toEqual(["another layer.element"]);
    });

    it("should return rules from the selected element", () => {
      const element = ElementFactory().create({ name: "element" });
      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
      });
      layer.selectedElement = element;
      element.cannotAccompany = ["another layer.element"];
      const rulesFromLayer = rules.getRulesFromLayer(layer, "cannotAccompany");
      expect(rulesFromLayer).toEqual(["another layer.element"]);
    });
  });

  describe("cannotAccompany", () => {
    describe("layer", () => {
      test("*", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
          cannotAccompany: { "*": ["above head.rain cloud"] },
        });
        headwearLayer.selectedElement = hat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("element exact match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
          cannotAccompany: { Hat: ["Above head.Rain Cloud"] },
        });
        headwearLayer.selectedElement = hat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("element regex match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
          cannotAccompany: { Hat: ["Above head./rain/"] },
        });
        headwearLayer.selectedElement = hat;

        const layers: Layer[] = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("layer match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
          cannotAccompany: { Hat: ["Above head"] },
        });
        headwearLayer.selectedElement = hat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("no match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
          cannotAccompany: { hat: ["above head.cloud"] },
        });
        headwearLayer.selectedElement = hat;

        const layers = [aboveHeadLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });
    });

    describe("element", () => {
      test("exact match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;
        const hat = ElementFactory().create({
          name: "Hat",
          cannotAccompany: ["above head.rain cloud"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;
        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("regex match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;
        const hat = ElementFactory().create({
          name: "Hat",
          cannotAccompany: ["above head./rain/"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;
        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("layer name match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;
        const hat = ElementFactory().create({
          name: "Hat",
          cannotAccompany: ["above head"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;
        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("no match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;
        const hat = ElementFactory().create({
          name: "Hat",
          cannotAccompany: ["above head.cloud"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;
        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.cannotAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });
    });
  });

  describe("mustAccompany", () => {
    it("should return true if there is no match", () => {
      const layer = LayerFactory().create({
        name: "test",
        elements: [],
        mustAccompany: { "*": ["background"] },
      });
      expect(rules.mustAccompany(layer, [layer])).toBe(true);
    });

    it("should return true if there are no rules defined", () => {
      const elements = [ElementFactory().create({ name: "Red" })];
      const layer = LayerFactory().create({
        name: "Wristband",
        elements,
      });
      layer.selectedElement = elements[0];
      const result = rules.mustAccompany(layer, [layer]);
      expect(result).toBe(true);
    });

    describe("element", () => {
      test("no match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
          mustAccompany: ["Above head.Sun"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;

        const layers: Layer[] = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("exact match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
          mustAccompany: ["Above head.Rain Cloud"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;

        const layers: Layer[] = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });

      test("regex match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
          mustAccompany: ["Above head./Rain/"],
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
        });
        headwearLayer.selectedElement = hat;

        const layers: Layer[] = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });
    });

    describe("layer", () => {
      test("no match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const hat = ElementFactory().create({
          name: "Hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [hat],
          mustAccompany: { Hat: ["above head.sun"] },
        });
        headwearLayer.selectedElement = hat;

        const result = rules.mustAccompany(headwearLayer, [
          aboveHeadLayer,
          headwearLayer,
        ]);
        expect(result).toBe(false);
      });

      test("layer match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const umbrellaHat = ElementFactory().create({
          name: "Umbrella hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [umbrellaHat],
          mustAccompany: { "*": ["above head"] },
        });
        headwearLayer.selectedElement = umbrellaHat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });

      test("exact match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const umbrellaHat = ElementFactory().create({
          name: "Umbrella hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [umbrellaHat],
          mustAccompany: { [umbrellaHat.name]: ["Above head.Rain Cloud"] },
        });
        headwearLayer.selectedElement = umbrellaHat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });

      test("match, but no selected element", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });

        const umbrellaHat = ElementFactory().create({
          name: "Umbrella hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [umbrellaHat],
          mustAccompany: { [umbrellaHat.name]: ["Above head.Rain Cloud"] },
        });
        headwearLayer.selectedElement = umbrellaHat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("regex match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const umbrellaHat = ElementFactory().create({
          name: "Umbrella hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [umbrellaHat],
          mustAccompany: { [umbrellaHat.name]: ["above head./cloud/"] },
        });
        headwearLayer.selectedElement = umbrellaHat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(true);
      });

      test("regex no match", () => {
        const rainCloud = ElementFactory().create({
          name: "Rain Cloud",
        });
        const aboveHeadLayer = LayerFactory().create({
          name: "Above head",
          elements: [rainCloud],
        });
        aboveHeadLayer.selectedElement = rainCloud;

        const umbrellaHat = ElementFactory().create({
          name: "Umbrella hat",
        });
        const headwearLayer = LayerFactory().create({
          name: "Headwear",
          elements: [umbrellaHat],
          mustAccompany: { [umbrellaHat.name]: ["above head./sun/"] },
        });
        headwearLayer.selectedElement = umbrellaHat;

        const layers = [aboveHeadLayer, headwearLayer];
        const result = rules.mustAccompany(headwearLayer, layers);
        expect(result).toBe(false);
      });

      test("key regex match", () => {
        const cyclopsPupil = ElementFactory().create({
          name: "Cyclops Big",
        });
        const pupils = LayerFactory().create({
          name: "Pupils",
          elements: [cyclopsPupil],
        });
        pupils.selectedElement = cyclopsPupil;

        const cyclopsEyeWhites = ElementFactory().create({
          name: "Big Cyclops",
        });
        const eyeWhites = LayerFactory().create({
          name: "Headwear",
          elements: [cyclopsEyeWhites],
          mustAccompany: { ["/cyclops/"]: ["pupils./cyclops/"] },
        });
        eyeWhites.selectedElement = cyclopsEyeWhites;

        const layers = [eyeWhites, pupils];
        const result = rules.mustAccompany(eyeWhites, layers);
        expect(result).toBe(true);
      });

      test("key regex no match", () => {
        const regularPupil = ElementFactory().create({
          name: "Regular",
        });
        const pupils = LayerFactory().create({
          name: "Pupils",
          elements: [regularPupil],
        });
        pupils.selectedElement = regularPupil;

        const cyclopsEyeWhites = ElementFactory().create({
          name: "Big Cyclops",
        });
        const eyeWhites = LayerFactory().create({
          name: "Headwear",
          elements: [cyclopsEyeWhites],
          mustAccompany: { ["/Cyclops/"]: ["Pupils./Cyclops/"] },
        });
        eyeWhites.selectedElement = cyclopsEyeWhites;

        const layers = [eyeWhites, pupils];
        const result = rules.mustAccompany(eyeWhites, layers);
        expect(result).toBe(false);
      });
    });
  });
});
