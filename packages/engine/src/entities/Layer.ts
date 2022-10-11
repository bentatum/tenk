import { Factory, LayerConfig } from "@/interfaces";
import { inject, injectable } from "inversify";
import { Element } from "./Element";

@injectable()
export class Layer implements Factory {
  name: string;
  elements: Element[];
  selectedElement?: Element;
  odds: number;
  bypassDNA: boolean;
  cannotAccompany?: Record<string, string[]>;
  mustAccompany?: Record<string, string[]>;
  metadata: Record<string, any> = {};

  constructor(
    @inject("Factory<Element>")
    public elementFactory: () => Element
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
    return this.selectedElement?.layers || [];
  }

  create({
    name,
    elements,
    odds,
    bypassDNA,
    cannotAccompany,
    mustAccompany,
    metadata,
  }: LayerConfig) {
    this.name = name;
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
}
