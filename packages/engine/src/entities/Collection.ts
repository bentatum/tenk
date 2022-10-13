import {
  Attribute,
  Factory,
  LayerConfig,
  Metadata,
  Options,
} from "@/interfaces";
import { inject, injectable } from "inversify";
import { Layer } from "./Layer";
import sha256 from "@/lib/sha256";

@injectable()
export class Collection implements Factory {
  size: number;
  duplicateThreshold: number;
  brokenRuleThreshold: number;
  layers: Layer[] = [];
  metadata: Metadata[];

  constructor(
    @inject("Factory<Layer>")
    public layerFactory: () => Layer
  ) {}

  create(
    layerConfigurations: LayerConfig[],
    {
      brokenRuleThreshold = 100,
      duplicateThreshold = 100,
      size = 10000,
    }: Options = {}
  ) {
    this.layers = layerConfigurations.map((layer) =>
      this.layerFactory().create(layer)
    );
    this.brokenRuleThreshold = brokenRuleThreshold;
    this.duplicateThreshold = duplicateThreshold;
    this.size = size;
    return this.generateMetadata();
  }

  filterByOdds(layers: Layer[]): Layer[] {
    return layers.filter((layer) => {
      const odds = layer.odds;
      return odds === 0 ? false : odds === 1 || Math.random() < odds;
    });
  }

  throwIfLayersBreakRules(layers: Layer[]) {
    if (!layers.every((layer) => layer.canBeSelected(layers))) {
      throw new Error("Broken rules");
    }
  }

  getRenderableLayers(layers: Layer[]): Layer[] {
    const renderableLayers = this.filterByOdds(layers)
      .map((layer) => layer.selectElement())
      .filter((layer) => layer.selectedElement);

    this.throwIfLayersBreakRules(renderableLayers);

    const childLayers: Layer[] = renderableLayers
      .map((layer) => layer.getChildLayers())
      .flat() as Layer[];

    if (childLayers.length) {
      renderableLayers.push(...this.getRenderableLayers(childLayers));
    }

    return renderableLayers;
  }

  getDna(layers: Layer[]): string {
    const message = layers.reduce(
      (acc, { selectedElement, bypassDNA }, index) => {
        if (!bypassDNA && selectedElement) {
          acc += selectedElement.name;
        }
        return acc;
      },
      ""
    );
    return sha256(message);
  }

  mapLayerAttributes(layer: Layer) {
    if (!layer.selectedElement) {
      throw new Error("Layer must have a selected element");
    }
    const attr: Attribute = {
      trait_type: layer.name,
      value: layer.selectedElement.name,
    };
    if (layer.selectedElement.metadata) {
      attr.metadata = layer.selectedElement.metadata;
    }
    return attr;
  }

  generateMetadata() {
    const dnaSet = new Set();
    const data: Metadata[] = [];

    let _duplicateThreshold = this.duplicateThreshold;
    let _brokenRuleThreshold = this.brokenRuleThreshold;

    for (let tokenId = 0; tokenId < this.size; tokenId++) {
      let renderableLayers: Layer[] = [];

      try {
        renderableLayers = this.getRenderableLayers(this.layers);
      } catch {
        if (_brokenRuleThreshold > 0) {
          _brokenRuleThreshold--;
          tokenId--;
          continue;
        } else {
          // too many broken rules
          break;
        }
      }

      if (renderableLayers.length) {
        const dna = this.getDna(renderableLayers);
        if (!dnaSet.has(dna)) {
          data.push({
            name: String(tokenId),
            attributes: renderableLayers.map(this.mapLayerAttributes),
            dna,
          });
          dnaSet.add(dna);
        } else if (dnaSet.has(dna) && _duplicateThreshold > 0) {
          _duplicateThreshold -= 1;
          tokenId -= 1;
          continue;
        } else {
          // too many duplicates
          break;
        }
      }
    }

    return data;
  }
}
