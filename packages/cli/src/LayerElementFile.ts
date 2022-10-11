import { LayerElement, LayerElementConfig } from "@tenk/engine";
import sizeOf from "image-size";
import { Service } from "typedi";
import { layersDir } from "./env";
import { Factory } from "./types";

@Service()
export default class LayerElementFile extends LayerElement implements Factory {
  height: number;
  width: number;
  fileName: string;
  filePath: string;

  constructor(layerElementConfig: LayerElementConfig) {
    super(layerElementConfig);
  }

  setDimensions() {
    const { height, width } = sizeOf(this.filePath);
    this.height = height;
    this.width = width;
  }

  create(fileName: string) {
    this.filePath = `${layersDir}/${fileName}`;
    this.fileName = fileName;
    this.setDimensions();
    return this;
  }
}
