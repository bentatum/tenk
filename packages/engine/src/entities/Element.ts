import { Layer } from "./Layer";
import { ElementConfig, Factory } from "../interfaces";
import { injectable } from "inversify";

@injectable()
export class Element implements Factory {
  name: string;
  weight: number;
  layers: Layer[];
  cannotAccompany?: string[];
  mustAccompany?: string[];
  metadata?: Record<string, any>;

  constructor() {}

  create({ name, weight, cannotAccompany, mustAccompany, metadata }: ElementConfig) {
    this.name = name;
    this.weight = typeof weight === "undefined" ? 1 : weight;
    // this.layers = layers?.map((layer) => new Layer(layer)) || [];
    this.cannotAccompany = cannotAccompany;
    this.mustAccompany = mustAccompany;
    this.metadata = metadata;
    return this;
  }
}
