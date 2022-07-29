import "@/test/mocks/sha256";
import { container } from "@/inversify.config";
import { Layer, Element } from "@/entities";

const LayerFactory = () => container.get<Layer>("Layer");
const ElementFactory = () => container.get<Element>("Element");

describe("Rules", () => {
  describe("getChildLayers", () => {
    it("should return child layers", () => {
      const childLayers = [
        LayerFactory().create({
          name: "child layer test",
          elements: [
            ElementFactory().create({
              name: "child element test",
            }),
          ],
        }),
      ];

      const element = ElementFactory().create({
        name: "test",
        layers: childLayers,
      });

      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
      });

      layer.selectedElement = element;

      expect(layer.getChildLayers()).toEqual(childLayers);
    });
    it("should default to an empty array", () => {
      const element = ElementFactory().create({
        name: "test",
      });

      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
      });

      layer.selectedElement = element;

      expect(layer.getChildLayers()).toEqual([]);
    });

    it("should default to an empty array if there's no selected element", () => {
      const element = ElementFactory().create({
        name: "test",
      });

      const layer = LayerFactory().create({
        name: "test",
        elements: [element],
      });

      expect(layer.getChildLayers()).toEqual([]);
    });
  });
});
