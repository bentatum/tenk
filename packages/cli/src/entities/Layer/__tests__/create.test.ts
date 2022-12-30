import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import { Layer } from "../Layer";
import fs from "fs";
import { layersDir } from "@/env";

jest.mock("/test/tenk.config.js", () => ({}), { virtual: true });

const LayerFactory = () => container.get<Layer>("Layer");

jest.mock("fs");
const mockedFsReaddirSync = createMock(fs.readdirSync);

mockedFsReaddirSync.mockReturnValue([
  {
    name: "element1.svg",
    isFile: () => true,
  },
  {
    name: "element2.svg",
    isFile: () => true,
  },
] as any);

jest.mock("image-size", () =>
  jest.fn().mockReturnValue({
    width: 100,
    height: 100,
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Layer.create", () => {
  let layer: Layer;
  const layerName = "01_test#50";

  beforeEach(() => {
    layer = LayerFactory();
    layer.updateMetadata = jest.fn();
    layer.setElements = jest.fn();
    layer.getLayerDirNames = jest.fn().mockReturnValue([]);
  });

  describe("without config", () => {
    beforeEach(() => {
      layer.create(layerName);
    });
    it("set the name", () => {
      expect(layer.name).toBe("test");
    });
    it("sets the odds from the folder name", () => {
      expect(layer.odds).toBe(0.5);
    });
    it("calls updateMetadata", () => {
      expect(layer.updateMetadata).toBeCalledWith({
        path: `${layersDir}/${layerName}`,
      });
    });
    it("calls setElements", () => {
      expect(layer.setElements).toHaveBeenCalled();
    });
  });

  it("should append the parent layer name to its own", () => {
    layer.create(layerName, "/layers", {
      name: "foo",
      parentLayer: undefined,
    });
    expect(layer.name).toBe("foo_test");
  });

  describe("with layer config", () => {
    const config = {
      layers: {
        test: {
          odds: 0.5,
          mustAccompany: {
            "*": ["some other layer"],
          },
        },
      },
    };

    beforeEach(() => {
      layer.config = {
        get: jest.fn().mockReturnValue(config.layers),
      } as any;
      layer.getLayerConfig = jest.fn().mockReturnValue(config.layers.test);
      layer.odds = 1;
      layer.mustAccompany = undefined;
      layer.create(layerName);
    });

    it("sets properties from configuration", () => {
      expect(layer.odds).toBe(0.5);
      expect(layer.mustAccompany).toEqual({
        "*": ["some other layer"],
      });
    });
  });

  describe("layer config respects casing", () => {
    const config = {
      layers: {
        test: {
          odds: 0.5,
          mustAccompany: {
            "*": ["some other layer"],
          },
        },
      },
    };

    beforeEach(() => {
      layer.config = {
        get: jest.fn().mockReturnValue(config.layers),
      } as any;
      layer.odds = 1;
      layer.mustAccompany = undefined;
      layer.create("01_TeSt");
    });

    it("does not set properties", () => {
      expect(layer.odds).toBe(1);
      expect(layer.mustAccompany).toBeUndefined();
    });
  });

  describe("with * config", () => {
    const config = {
      layers: {
        "*": {
          odds: 0.5,
          mustAccompany: {
            "*": ["some other layer"],
          },
        },
      },
    };

    beforeEach(() => {
      layer.config = {
        get: jest.fn().mockReturnValue(config.layers),
      } as any;
      layer.odds = 1;
      layer.mustAccompany = undefined;
      layer.create(layerName);
    });

    it("sets properties from star configuration", () => {
      expect(layer.odds).toBe(0.5);
      expect(layer.mustAccompany).toEqual({
        "*": ["some other layer"],
      });
    });
  });
});
