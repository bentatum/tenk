import { container } from "@/inversify.config";
import { Layer } from "../Layer";

describe("Layer.getLayerConfigKey", () => {
  it("should return a composite key, accounting for recursive parent layers", () => {
    const layer = container.get<Layer>("Layer");
    layer.name = "Arms";
    layer.parentLayer = {
      name: "Skin",
      parentLayer: {
        name: "Body",
      },
    } as any;
    expect(layer.getLayerConfigKey(layer)).toBe("Body.Skin.Arms");
  });

  test("no parent layer", () => {
    const layer = container.get<Layer>("Layer");
    layer.name = "Arms";
    expect(layer.getLayerConfigKey(layer)).toBe("Arms");
  });
});
