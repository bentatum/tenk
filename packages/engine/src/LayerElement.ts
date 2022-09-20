import { Layer } from "./Layer";
import { LayerElementConfig } from "./types";

export class LayerElement {
  name: string;
  weight: number;
  layers: Layer[];
  cannotAccompany?: string[];
  mustAccompany?: string[];
  imgHeight?: number;
  imgWidth?: number;
  imgPath?: string;

  constructor(options: LayerElementConfig) {
    this.name = options.name;
    this.weight = typeof options.weight === "undefined" ? 1 : options.weight;
    this.layers = options.layers?.map((layer) => new Layer(layer)) || [];
    this.cannotAccompany = options.cannotAccompany;
    this.mustAccompany = options.mustAccompany;
    this.imgHeight = options.imgHeight;
    this.imgWidth = options.imgWidth;
    this.imgPath = options.imgPath;
  }
}
