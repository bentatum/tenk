import { container } from "@/inversify.config";
import { SvgFile } from "@/entities/SvgFile";

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SvgFile.getViewBox", () => {
  let svgFile: SvgFile;

  beforeEach(() => {
    svgFile = SvgFileFactory();
  });

  it("should return the viewBox from the svg", () => {
    svgFile.getHtmlElement = jest.fn().mockReturnValue({
      querySelector: jest.fn().mockReturnValue({
        getAttribute: jest.fn().mockReturnValue("0 0 100 100"),
      }),
    } as any);
    const elements = svgFile.getSvgGroupElements([
      {
        trait_type: "body",
        value: "normal",
        metadata: {
          height: 100,
          width: 100,
          path: "/test/path",
          fileType: "svg",
        },
      },
    ]);
    expect(elements).toEqual([
      {
        getAttribute: expect.any(Function),
      },
    ]);
  });
});
