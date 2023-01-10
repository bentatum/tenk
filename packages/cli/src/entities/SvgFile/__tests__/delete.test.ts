import { createMock } from "ts-jest-mock";
import fs from "fs";
import { container } from "@/inversify.config";
import { SvgFile } from "../SvgFile";
import parseHtml from "node-html-parser";

jest.mock("node-html-parser");
const mockedParseHtml = createMock(parseHtml);

jest.mock("fs");
const rmSyncMock = createMock(fs.rmSync);

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

describe("SvgFile.delete", () => {
  it("should throw if the path is not defined", () => {
    const svgFile = SvgFileFactory();
    expect(() => svgFile.delete()).toThrow();
  });

  it("calls fs.rmSync with the path", () => {
    mockedParseHtml.mockReturnValue({
      querySelector: jest.fn().mockReturnValue({
        appendChild: jest.fn(),
        toString: jest.fn().mockReturnValue("<svg></svg>"),
      }),
    } as any);
    const svgFile = SvgFileFactory();

    svgFile.getViewBox = jest.fn().mockReturnValue("0 0 100 100");
    svgFile.getSvgGroupElements = jest.fn().mockReturnValue([]);

    svgFile.create(
      [
        {
          metadata: {
            height: 100,
            width: 100,
          },
        },
      ] as any,
      "/test/path"
    );

    svgFile.delete();

    expect(rmSyncMock).toBeCalledWith("/test/path");
  });
});
