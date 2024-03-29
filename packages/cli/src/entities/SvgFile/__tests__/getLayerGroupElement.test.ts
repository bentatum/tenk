import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { SvgFile } from "../SvgFile";

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SvgFile.getLayerGroupElement", () => {
  let svgFile: SvgFile;
  const mockedAttribute = {
    trait_type: "body",
    value: "normal",
    metadata: {
      height: 100,
      width: 100,
      path: "/test/path",
      fileType: FileType.SVG,
    },
  };
  let mockedQuerySelector: jest.Mock;
  let result: any;
  let mockedHtmlElement: any;

  beforeEach(() => {
    svgFile = SvgFileFactory();
    mockedHtmlElement = { id: "test" } as any;
    mockedQuerySelector = jest.fn().mockReturnValue(mockedHtmlElement);
    svgFile.getHtmlElement = jest.fn().mockReturnValue({
      querySelector: mockedQuerySelector,
    } as any);
    result = svgFile.getLayerGroupElement(mockedAttribute);
  });

  it("calls getHtmlElement with attribute", () => {
    expect(svgFile.getHtmlElement).toBeCalledWith(mockedAttribute);
  });

  it("calls querySelector with svg", () => {
    expect(mockedQuerySelector).toBeCalledWith("svg");
  });
});
