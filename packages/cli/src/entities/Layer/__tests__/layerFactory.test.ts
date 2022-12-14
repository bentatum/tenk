import { container } from "@/inversify.config";
import { Layer } from "../Layer";

describe("Layer.layerFactory", () => {
  it("should return a new element", () => {
    const layer = container.get<Layer>("Layer");
    const factory = layer.layerFactory();
    expect(factory).toBeInstanceOf(Layer);
  });
});
