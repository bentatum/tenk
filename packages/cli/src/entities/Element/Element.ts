import sizeOf from "image-size";
import { inject, injectable } from "inversify";
import {
  ElementConfig,
  ElementMetadata,
  Factory,
  FileType,
} from "@/interfaces";
import { Logger } from "../Logger";
import { extname } from "path";

@injectable()
export class Element implements Factory {
  name: string;
  weight: number;
  metadata: ElementMetadata = {
    fileType: FileType.PNG,
    path: "",
    height: 0,
    width: 0,
  };

  constructor(
    @inject("Logger")
    public logger: Logger
  ) {}

  updateMetadata(data: Partial<ElementMetadata>) {
    this.metadata = { ...this.metadata, ...data };
  }

  setDimensions() {
    const { height, width } = sizeOf(this.metadata.path);
    this.updateMetadata({ height, width });
  }

  create({ path, metadata, weight }: ElementConfig) {
    const fileName = path.split("/").pop();
    this.name = fileName.replace(extname(fileName), "");
    this.weight = weight;
    this.updateMetadata({ path, ...metadata });
    this.setDimensions();
    return this;
  }
}
