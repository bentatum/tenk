import { container } from "@/inversify.config";
import { Layer } from "../Layer";
import { Element } from '@/entities/Element'

describe("Layer.elementFactory", () => {
  it("should return a new element", () => {
    const layer = container.get<Layer>("Layer");
    const element = layer.elementFactory();
    expect(element).toBeInstanceOf(Element);
  });
});
