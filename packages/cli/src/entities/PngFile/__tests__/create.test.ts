import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { loadImage } from "canvas";
import { createMock } from "ts-jest-mock";
import { PngFile } from "../PngFile";
import fs from "fs";

jest.mock("canvas", () => ({
  createCanvas: jest.fn().mockReturnValue({
    getContext: jest.fn(),
  }),
  loadImage: jest.fn(),
}));
const mockedLoadImage = createMock(loadImage);

jest.mock("fs");
const mockedFsWriteFileSync = createMock(fs.writeFileSync);

const PngFileFactory = () => container.get<PngFile>("PngFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PngFile.create", () => {
  const attributes = [
    {
      trait_type: "body",
      value: "normal",
      metadata: {
        path: "path/to/file.png",
        width: 100,
        height: 100,
        fileType: FileType.PNG,
      },
    },
    {
      trait_type: "hair",
      value: "short",
      metadata: {
        path: "path/to/file.png",
        width: 100,
        height: 100,
        fileType: FileType.PNG,
      },
    },
  ];

  const renderPath = "path/to/render.png";
  const loadPath = "path/to/load.png";

  const img = { width: 100, height: 100 };

  let pngFile: PngFile;

  beforeEach(async () => {
    mockedLoadImage.mockResolvedValue(img as any);
    pngFile = PngFileFactory();
    pngFile.canvas = { toBuffer: jest.fn() } as any;
    pngFile.canvasContext = {
      drawImage: jest.fn(),
    } as any;
  });

  describe("load path", () => {
    it("should call loadImage with the load path", async () => {
      await pngFile.create(attributes, renderPath, loadPath);
      expect(mockedLoadImage).toHaveBeenCalledWith(loadPath);
    });

    it("should call loadImage with the metadata path if no load path is provided", async () => {
      await pngFile.create(attributes, renderPath);
      expect(mockedLoadImage).toHaveBeenCalledWith(attributes[0].metadata.path);
    });
  });

  test("drawImage should be called with the correct arguments", async () => {
    await pngFile.create(attributes, renderPath);
    expect(pngFile.canvasContext.drawImage).toHaveBeenCalledWith(
      img,
      0,
      0,
      attributes[0].metadata.width,
      attributes[0].metadata.height
    );
  });

  test("fs.writeFileSync should be called with the correct arguments", async () => {
    await pngFile.create(attributes, renderPath);
    expect(mockedFsWriteFileSync).toHaveBeenCalledWith(
      renderPath,
      pngFile.canvas.toBuffer()
    );
  });

  test("canvas toBuffer should be called with the correct arguments", async () => {
    await pngFile.create(attributes, renderPath);
    expect(pngFile.canvas.toBuffer).toHaveBeenCalledWith("image/png");
  });

  it("should loop through all attributes", async () => {
    await pngFile.create(attributes, renderPath);
    expect(mockedLoadImage).toHaveBeenCalledTimes(attributes.length);
  });
});
