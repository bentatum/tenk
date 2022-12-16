import { Factory, LayerConfig } from "@/interfaces";
import { inject, injectable } from "inversify";
import { Element } from "./Element";
import { Rules } from "./Rules";

@injectable()
export class Layer implements Factory {
  name: string;
  layers: Layer[];
  elements: Element[];
  selectedElement?: Element;
  odds: number;
  bypassDNA: boolean;
  cannotAccompany?: Record<string, string[]>;
  mustAccompany?: Record<string, string[]>;
  metadata: Record<string, any> = {};

  constructor(
    @inject("Factory<Element>")
    public elementFactory: () => Element,
    @inject("Factory<Layer>")
    public layerFactory: () => Layer,
    @inject("Rules")
    public rules: Rules
  ) {}

  selectElement(): Layer {
    const elements = this.elements.filter((element) => element.weight > 0);
    const totalWeight = elements.reduce((acc, element) => {
      acc += element.weight;
      return acc;
    }, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].weight > random) {
        this.selectedElement = elements[i];
        break;
      } else {
        random -= elements[i].weight;
      }
    }
    return this;
  }

  getChildLayers(): Layer[] {
    return !this.elements.length && this.layers.length > 0
      ? this.layers
      : this.selectedElement?.layers || [];
  }

  isRenderable(): boolean {
    return Boolean(this.selectedElement || this.layers.length);
  }

  create({
    name,
    layers = [],
    elements = [],
    odds,
    bypassDNA,
    cannotAccompany,
    mustAccompany,
    metadata,
  }: LayerConfig) {
    this.name = name;
    this.layers = layers.map((layer) => this.layerFactory().create(layer));
    this.elements = elements.map((element) =>
      this.elementFactory().create(element)
    );
    this.odds = typeof odds === "undefined" ? 1 : odds;
    this.bypassDNA = bypassDNA || false;
    this.cannotAccompany = cannotAccompany;
    this.mustAccompany = mustAccompany;
    this.metadata = metadata;
    return this;
  }

  canBeSelected(selectedLayers: Layer[]) {
    return (
      this.rules.cannotAccompany(this, selectedLayers) &&
      this.rules.mustAccompany(this, selectedLayers)
    );
  }
}
