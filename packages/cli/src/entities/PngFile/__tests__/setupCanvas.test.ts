import { container } from "@/inversify.config";
import { createCanvas } from "canvas";
import { createMock } from "ts-jest-mock";
import { PngFile } from "../PngFile";

jest.mock("canvas", () => ({
  createCanvas: jest.fn(),
  loadImage: jest.fn(),
}));
const mockedCreateCanvas = createMock(createCanvas);

const PngFileFactory = () => container.get<PngFile>("PngFile");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PngFile.setupCanvas", () => {
  const height = 100;
  const width = 100;

  let pngFile: PngFile;

  beforeEach(() => {
    const mockedCanvas = {
      getContext: jest.fn().mockReturnValue({ drawImage: jest.fn() }),
    } as any;
    mockedCreateCanvas.mockReturnValue(mockedCanvas);

    pngFile = PngFileFactory();
    pngFile.setupCanvas(height, width);
  });

  it("should set canvas and canvasContext", () => {
    expect(pngFile.canvas).toBeDefined();
    expect(pngFile.canvasContext).toBeDefined();
  });

  it("calls createCanvas with height and width", () => {
    expect(mockedCreateCanvas).toHaveBeenCalledWith(height, width);
  });

  it("calls getContext on canvas", () => {
    expect(pngFile.canvas.getContext).toHaveBeenCalledWith("2d");
  });
});
