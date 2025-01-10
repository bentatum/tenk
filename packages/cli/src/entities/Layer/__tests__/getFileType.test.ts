import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const layer = container.get<Layer>("Layer");

describe("Layer.getFileType", () => {
  it("returns the layer's file type", () => {
    const randomFileName = ["test.svg", "test.png"][
      Math.floor(Math.random() * 2)
    ];
    const randomFileType = layer.parseFileType(randomFileName!);
    layer.metadata = {
      path: "/layers/background",
      fileType: randomFileType,
    };
    expect(layer.getFileType()).toBe(randomFileType);
  });
});
