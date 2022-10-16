import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const layer = container.get<Layer>("Layer");

describe("Layer.getFileType", () => {
  it("returns the layer's file type", () => {
    const randomFileType = ["svg", "png"][Math.floor(Math.random() * 2)];
    layer.metadata = {
      path: "/layers/background",
      fileType: randomFileType as FileType,
    };
    expect(layer.getFileType()).toBe(randomFileType);
  });
});
