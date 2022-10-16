import { container } from "@/inversify.config";
import { SvgFile } from "@/entities/SvgFile";
import { FileType } from "@/interfaces";
import { createMock } from "ts-jest-mock";
import fs from "fs";
import parseHtml from "node-html-parser";

jest.mock("fs");
const mockedWriteFileSync = createMock(fs.writeFileSync);

jest.mock("node-html-parser");
const mockedParseHtml = createMock(parseHtml);

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SvgFile.create", () => {
  let svgFile: SvgFile;

  beforeEach(() => {
    svgFile = SvgFileFactory();
  });

  it("should write an svg file to the render path", () => {
    mockedParseHtml.mockReturnValue({
      querySelector: jest.fn().mockReturnValue({
        appendChild: jest.fn(),
        toString: jest.fn().mockReturnValue("<svg></svg>"),
      }),
    } as any);
    svgFile.getSvgGroupElements = jest.fn().mockReturnValue([]);
    svgFile.getViewBox = jest.fn().mockReturnValue("0 0 100 100");
    const mockedAttributes = [
      {
        trait_type: "body",
        value: "normal",
        metadata: {
          height: 100,
          width: 100,
          path: "/test/path",
          fileType: "svg" as FileType,
        },
      },
    ];
    mockedWriteFileSync.mockReturnValue();
    const renderPath = "/test";
    svgFile.create(mockedAttributes, renderPath);
    expect(mockedWriteFileSync).toBeCalledWith(renderPath, "<svg></svg>");
  });

  it("should apply svgAttributes", () => {
    const mockedSetAttributes = jest.fn();
    svgFile.getSvgGroupElements = jest.fn().mockReturnValue([
      {
        setAttributes: mockedSetAttributes,
      },
    ]);
    svgFile.getViewBox = jest.fn().mockReturnValue("0 0 100 100");
    const mockedSvgAttributes = {
      "data-test": "test",
    };
    const mockedAttributes = [
      {
        trait_type: "body",
        value: "normal",
        metadata: {
          height: 100,
          width: 100,
          path: "/test/path",
          fileType: "svg" as FileType,
          svgAttributes: mockedSvgAttributes,
        },
      },
    ];
    mockedWriteFileSync.mockReturnValue();
    const renderPath = "/test";
    svgFile.create(mockedAttributes, renderPath);
    expect(mockedSetAttributes).toBeCalledWith(mockedSvgAttributes);
    expect(mockedWriteFileSync).toBeCalledWith(
      renderPath,
      expect.stringContaining("</svg>")
    );
  });
});
