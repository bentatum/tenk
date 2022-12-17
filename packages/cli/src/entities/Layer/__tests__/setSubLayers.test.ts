import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const layer = container.get<Layer>("Layer");

describe("Layer.setSubLayers", () => {
  it("should create layers for each directory within the layer directory", () => {
    const name = "Shirt";
    layer.name = name;
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
    expect(layerCreateMock).toHaveBeenNthCalledWith(1, "Color", path, {
      name,
      parentLayer: undefined,
    });
    expect(layerCreateMock).toHaveBeenNthCalledWith(2, "Outline", path, {
      name,
      parentLayer: undefined,
    });

    expect(layer.layers).toBeDefined();
  });

  it("should pass along parent layer", () => {
    layer.getLayerDirNames = jest.fn().mockReturnValueOnce(["Color"]);

    const layerCreateMock = jest.fn();
    layer.layerFactory = jest.fn().mockReturnValue({
      create: layerCreateMock,
    });

    const path = "/layers/Shirt";
    layer.metadata = {
      path,
    } as any;
    const parentLayer = {
      name: "Body",
      parentLayer: {
        name: "Person",
      },
    };
    layer.name = "Shirt";
    layer.parentLayer = parentLayer as any;

    layer.setSubLayers();

    expect(layerCreateMock).toHaveBeenCalledTimes(1);
    expect(layerCreateMock).toHaveBeenCalledWith("Color", path, {
      name: "Shirt",
      parentLayer,
    });
  });
});
