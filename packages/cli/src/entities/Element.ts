import sizeOf from "image-size";
import { injectable } from "inversify";
import { ElementConfig, ElementMetadata, Factory } from "@/interfaces";

@injectable()
export class Element implements Factory {
  name: string;

  metadata: ElementMetadata = {
    fileType: "png",
    path: "",
    height: 0,
    width: 0,
  };

  updateMetadata(data: Partial<ElementMetadata>) {
    this.metadata = { ...this.metadata, ...data };
  }

  setDimensions() {
    const { height, width } = sizeOf(this.metadata.path);
    this.updateMetadata({ height, width,  });
  }

  create({ path, metadata }: ElementConfig) {
    this.name = path.split("/").pop();
    this.updateMetadata({ path, ...metadata });
    this.setDimensions();
    return this;
  }
}
