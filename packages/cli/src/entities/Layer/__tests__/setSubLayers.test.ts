import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const layer = container.get<Layer>("Layer");

describe("Layer.setSubLayers", () => {
  it("should create layers for each directory within the layer directory", () => {
    layer.getLayerDirNames = jest
      .fn()
      .mockReturnValueOnce(["Color", "Outline"]);

    const layerCreateMock = jest.fn();
    layer.layerFactory = jest.fn().mockReturnValue({
      create: layerCreateMock,
    });

    const path = "/layers/Shirt";
    layer.metadata = {
      path,
    } as any;

    expect(layer.layers).toBeUndefined();

    layer.setSubLayers();

    expect(layerCreateMock).toHaveBeenCalledTimes(2);
    expect(layerCreateMock).toHaveBeenNthCalledWith(1, "Color", path);
    expect(layerCreateMock).toHaveBeenNthCalledWith(2, "Outline", path);

    expect(layer.layers).toBeDefined();
  });
});
