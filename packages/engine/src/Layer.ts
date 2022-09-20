import { LayerElement } from "./LayerElement";
import { LayerConfig } from "./types";

export class Layer {
  name: string;
  elements: LayerElement[];
  selectedElement?: LayerElement;
  odds: number;
  bypassDNA: boolean;
  cannotAccompany?: Record<string, string[]>;
  mustAccompany?: Record<string, string[]>;

  constructor(options: LayerConfig) {
    this.name = options.name;
    this.elements = options.elements.map(
      (element) => new LayerElement(element)
    );
    this.odds = typeof options.odds === "undefined" ? 1 : options.odds;
    this.bypassDNA = options.bypassDNA || false;
    this.cannotAccompany = options.cannotAccompany;
    this.mustAccompany = options.mustAccompany;
  }

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
}
