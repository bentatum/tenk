import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const layer = container.get<Layer>("Layer");

describe("Layer.parseFileType", () => {
  test("svg", () => {
    expect(layer.parseFileType("test.svg")).toBe(FileType.SVG);
  });
  test("png", () => {
    expect(layer.parseFileType("test.png")).toBe(FileType.PNG);
  });
  it("throws when file type is unsupported", () => {
    expect(() => layer.parseFileType("test.jpg")).toThrow();
  });
});
