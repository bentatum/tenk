// import { FileType } from "@/interfaces";
import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Layer } from "../Layer";

beforeEach(() => {
    jest.clearAllMocks();
})

describe("Layer.setElements", () => {
  let verboseLogMock;
  let elementFactoryCreateMock;

  beforeEach(() => {
    verboseLogMock = jest.fn();
    const layer = container.get<Layer>("Layer");
    layer.logger = {
      verbose: verboseLogMock,
    };
    layer.getLayerFiles = jest
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
    layer.setElements();
  });

  it("should pass down configuration to the element", () => {
    expect(elementFactoryCreateMock).toBeCalledTimes(2);
    expect(elementFactoryCreateMock).toBeCalledWith(
      expect.objectContaining({
        weight: 0.25,
      })
    );
  });

  it("should log verbose", () => {
    expect(verboseLogMock).toBeCalledTimes(2);
  });
});
