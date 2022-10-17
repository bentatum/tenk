import { container } from "@/inversify.config";
import { SvgFile } from "@/entities/SvgFile";
import parseHtml from "node-html-parser";
import { createMock } from "ts-jest-mock";

jest.mock("node-html-parser");
const mockedParseHtml = createMock(parseHtml);

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SvgFile.getHtmlElement", () => {
  let svgFile: SvgFile;

  beforeEach(() => {
    svgFile = SvgFileFactory();
  });

  it("should call node-html-parser with the attribute file", () => {
    svgFile.readAttributeFile = jest.fn().mockReturnValue({
      toString: jest.fn().mockReturnValue("test"),
    } as any);
    svgFile.getHtmlElement({
      trait_type: "body",
      value: "normal",
      metadata: {
        height: 100,
        width: 100,
        path: "/test/path",
        fileType: "svg",
      },
    });
    expect(mockedParseHtml).toBeCalledWith("test");
  });
});
