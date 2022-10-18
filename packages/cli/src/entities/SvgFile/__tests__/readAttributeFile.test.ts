import { createMock } from "ts-jest-mock";
import fs from "fs";
import { container } from "@/inversify.config";
import { SvgFile } from "../SvgFile";
import { FileType } from "@/interfaces";

jest.mock("fs");
const mockedFsReadFileSync = createMock(fs.readFileSync);

const SvgFileFactory = () => container.get<SvgFile>("SvgFile");

describe("SvgFile.readAttributeFile", () => {
  it("calls fs.readFileSync with the attribute's path", () => {
    const svgFile = SvgFileFactory();
    mockedFsReadFileSync.mockReturnValue({} as any);
    svgFile.readAttributeFile({
      trait_type: "body",
      value: "normal",
      metadata: {
        height: 100,
        width: 100,
        path: "/test/path",
        fileType: FileType.SVG,
      },
    });
    expect(mockedFsReadFileSync).toBeCalledWith("/test/path");
  });
});
