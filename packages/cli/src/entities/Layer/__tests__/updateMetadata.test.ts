import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Layer } from "../Layer";

const layer = container.get<Layer>("Layer");

describe("Layer.updateMetadata", () => {
  it("should update the metadata", () => {
    layer.metadata = {
      path: "",
      fileType: FileType.SVG,
    };

    layer.updateMetadata({
      path: "/layers/Shirt",
    });

    expect(layer.metadata).toEqual({
      path: "/layers/Shirt",
      fileType: FileType.SVG,
    });
  });
});
