import { container } from "@/inversify.config";
import { SvgFile } from "@/entities/SvgFile";
import { FileType } from "@/interfaces";

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SvgFile.getViewBox", () => {
  let svgFile: SvgFile;

  beforeEach(() => {
    svgFile = SvgFileFactory();
  });

  it("maps a g element to each attribute", () => {
    svgFile.getLayerGroupElement = jest.fn().mockReturnValue({
      getAttribute: jest.fn().mockReturnValue("0 0 100 100"),
    } as any);
    svgFile.getSvgGroupElements([
      {
        trait_type: "head",
        value: "normal",
        metadata: {
          height: 100,
          width: 100,
          path: "/test/path/head.svg",
          fileType: FileType.SVG,
        },
      },
      {
        trait_type: "body",
        value: "normal",
        metadata: {
          height: 100,
          width: 100,
          path: "/test/path/body.svg",
          fileType: FileType.SVG,
        },
      },
    ]);
    expect(svgFile.getLayerGroupElement).toBeCalledTimes(2);
    expect(svgFile.getLayerGroupElement).toHaveBeenLastCalledWith(
      expect.objectContaining({
        trait_type: "body",
      })
    );
  });
});
