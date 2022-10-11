import { ElementFileConfig, ElementFileMetadata, Factory } from "@/interfaces";
import { injectable } from "inversify";
import sizeOf from "image-size";

@injectable()
export class ElementFile implements Factory {
  name: string;

  metadata: ElementFileMetadata = {
    fileType: "png",
    path: "",
    height: 0,
    width: 0,
  };

  updateMetadata(data: Partial<ElementFileMetadata>) {
    this.metadata = { ...this.metadata, ...data };
  }

  setDimensions() {
    const { height, width } = sizeOf(this.metadata.path);
    this.updateMetadata({ height, width,  });
  }

  create({ path, metadata }: ElementFileConfig) {
    this.name = path.split("/").pop();
    this.updateMetadata({ path, ...metadata });
    this.setDimensions();
    return this;
  }
}
