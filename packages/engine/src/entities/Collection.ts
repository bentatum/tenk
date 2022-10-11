import { inject, injectable } from "inversify";
import { Layer } from "./Layer";
import {
  Attribute,
  Factory,
  LayerConfig,
  Metadata,
  Options,
  TransformAttributes,
} from "@/interfaces";
import cannotAccompanyFilter from "@/lib/cannotAccompanyFilter";
import mustAccompanyFilter from "@/lib/mustAccompanyFilter";
import sha256 from "@/lib/sha256";

@injectable()
export class Collection implements Factory {
  size: number;
  duplicateThreshold: number;
  layers: Layer[] = [];
  metadata: Metadata[];
  transformAttributes: TransformAttributes;

  constructor(
    @inject("Factory<Layer>")
    public layerFactory: () => Layer
  ) {}

  create(
    layerConfigurations: LayerConfig[],
    { size = 10000, duplicateThreshold = 100, transformAttributes }: Options
  ) {
    this.layers = layerConfigurations.map((layer) =>
      this.layerFactory().create(layer)
    );
    this.size = size;
    this.duplicateThreshold = duplicateThreshold || 100;
    this.transformAttributes =
      transformAttributes || this.defaultTransformAttributes;
    return this.generateMetadata();
  }

  filterByOdds(layers: Layer[]): Layer[] {
    return layers.filter((layer) => {
      const odds = layer.odds;
      return odds === 0 ? false : odds === 1 || Math.random() < odds;
    });
  }

  getRenderableLayers(layers: Layer[]): Layer[] {
    const renderableLayers = this.filterByOdds(layers)
      .map((layer) => layer.selectElement())
      .filter((layer) => layer.selectedElement);

    if (
      !renderableLayers.every(cannotAccompanyFilter) ||
      !renderableLayers.every(mustAccompanyFilter)
    ) {
      throw new Error();
    }

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

  defaultTransformAttributes(layers: Layer[]): Attribute[] {
    return layers.map((layer) => {
      const attr: Attribute = {
        trait_type: layer.name,
        value: layer.selectedElement?.name,
      };
      if (layer.selectedElement?.metadata) {
        attr.metadata = layer.selectedElement.metadata;
      }
      return attr;
    });
  }

  generateMetadata() {
    const dnaSet = new Set();
    const data: Metadata[] = [];
    let _duplicateThreshold = this.duplicateThreshold;

    for (let tokenId = 0; tokenId < this.size; tokenId++) {
      let renderableLayers;

      try {
        renderableLayers = this.getRenderableLayers(this.layers);
      } catch {
        tokenId -= 1;
        continue;
      }

      if (renderableLayers.length) {
        const dna = this.getDna(renderableLayers);
        if (!dnaSet.has(dna)) {
          data.push({
            name: String(tokenId),
            attributes: this.transformAttributes(renderableLayers),
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
