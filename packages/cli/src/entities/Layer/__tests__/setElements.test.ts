import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Layer } from "../Layer";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Layer.setElements", () => {
  describe("layer that has elements", () => {
    let verboseLogMock: jest.Mock;
    let elementFactoryCreateMock: jest.Mock;
    let layer: Layer;

    beforeEach(() => {
      verboseLogMock = jest.fn();
      layer = container.get<Layer>("Layer");
      layer.logger = {
        verbose: verboseLogMock,
      };
      layer.getLayerFileNames = jest
        .fn()
        .mockReturnValue(["test.svg", "test-test.svg"]);
      layer.parseFileType = jest.fn().mockReturnValue(FileType.SVG);
      layer.getLayerConfig = jest.fn().mockReturnValue({
        elements: {
          test: {
            weight: 0.25,
          },
        },
      });
      elementFactoryCreateMock = jest.fn();
      layer.elementFactory = jest.fn().mockReturnValue({
        create: elementFactoryCreateMock,
      });
      layer.updateMetadata = jest.fn();
      layer.setElements();
    });

    it("should pass down configuration to the element", () => {
      expect(elementFactoryCreateMock).toHaveBeenCalledTimes(2);
      expect(elementFactoryCreateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          weight: 0.25,
        })
      );
    });

    it("should log verbose", () => {
      expect(verboseLogMock).toHaveBeenCalledTimes(1);
    });

    it("should call updateMetadata", () => {
      expect(layer.updateMetadata).toBeCalledTimes(1);
    });
  });

  describe("layer that has no elements", () => {
    let verboseLogMock: jest.Mock;
    let elementFactoryCreateMock;
    let layer: Layer;

    beforeEach(() => {
      verboseLogMock = jest.fn();
      layer = container.get<Layer>("Layer");
      layer.logger = {
        verbose: verboseLogMock,
      };
      layer.getLayerFileNames = jest.fn().mockReturnValue([]);
      layer.parseFileType = jest.fn().mockReturnValue(FileType.SVG);
      layer.getLayerConfig = jest.fn().mockReturnValue({
        elements: {
          test: {
            weight: 0.25,
          },
        },
      });
      elementFactoryCreateMock = jest.fn();
      layer.elementFactory = jest.fn().mockReturnValue({
        create: elementFactoryCreateMock,
      });
      layer.updateMetadata = jest.fn();
      layer.setElements();
    });

    it("should not log verbose", () => {
      // we might want to change this and log a warning
      expect(verboseLogMock).not.toHaveBeenCalled();
    });

    it("should not call updateMetadata", () => {
      expect(layer.updateMetadata).not.toHaveBeenCalled();
    });
  });

  describe("layer that has elements but no configuration", () => {
    let verboseLogMock: jest.Mock;
    let elementFactoryCreateMock;
    let layer: Layer;

    beforeEach(() => {
      verboseLogMock = jest.fn();
      layer = container.get<Layer>("Layer");
      layer.logger = {
        verbose: verboseLogMock,
      };
      layer.getLayerFileNames = jest
        .fn()
        .mockReturnValue(["test.svg", "test-test.svg"]);
      layer.parseFileType = jest.fn().mockReturnValue(FileType.SVG);
      layer.getLayerConfig = jest.fn().mockReturnValue(undefined);
      elementFactoryCreateMock = jest.fn();
      layer.elementFactory = jest.fn().mockReturnValue({
        create: elementFactoryCreateMock,
      });
      layer.updateMetadata = jest.fn();
      layer.setElements();
    });

    it("should not log verbose if no config is found", () => {
      expect(verboseLogMock).toHaveBeenCalledTimes(0);
    });
  });
});
