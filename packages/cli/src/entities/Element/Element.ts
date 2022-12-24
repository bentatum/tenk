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

  parseFilePath(filePath: string): [string, number | undefined] {
    const fileName = filePath.split("/").pop();
    const [name, weight] = fileName.replace(extname(fileName), "").split("#");
    return [name, weight ? Number(weight) / 100 : undefined];
  }

  setNameAndWeight(filePath: string, weight?: number) {
    const [name, weightFromFileName] = this.parseFilePath(filePath);
    this.logger.verbose("Parsing element name and weight from file name", {
      name,
      weight: weightFromFileName,
    });
    this.name = name;
    this.weight = weight || weightFromFileName || 1;
  }

  create({ path, metadata, weight }: ElementConfig) {
    this.logger.verbose("Creating element...", { path, metadata, weight });
    this.setNameAndWeight(path, weight);
    this.updateMetadata({ path, ...metadata });
    this.setDimensions();
    return this;
  }
}
