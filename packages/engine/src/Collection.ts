import sha256 from "./lib/sha256";
import { Layer } from "./Layer";
import cannotAccompanyFilter from "./lib/cannotAccompanyFilter";
import mustAccompanyFilter from "./lib/mustAccompanyFilter";
import { Attribute, CollectionConfig, LayerConfig, Metadata } from "./types";

export class Collection {
  private layers: Layer[];
  private readonly duplicateThreshold: number;
  private readonly size: number;
  private metadata: Metadata[];

  constructor(layers: LayerConfig[], options?: CollectionConfig) {
    this.layers = layers.map((layer) => new Layer(layer));
    this.size = options?.size || 10000;
    this.duplicateThreshold = options?.duplicateThreshold || 100;
    this.createMetadata();
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

  getAttributes(layers: Layer[]): Attribute[] {
    return layers.map((layer) => ({
      trait_type: layer.name,
      value: layer.selectedElement?.name!,
      _imgWidth: layer.selectedElement?.imgWidth,
      _imgHeight: layer.selectedElement?.imgHeight,
      _imgPath: layer.selectedElement?.imgPath,
    }));
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
      .filter((layer) => layer.selectedElement)
      .filter(cannotAccompanyFilter)
      .filter(mustAccompanyFilter);

    const childLayers: Layer[] = renderableLayers
      .map((layer) => layer.getChildLayers())
      .flat() as Layer[];

    if (childLayers.length) {
      renderableLayers.push(...this.getRenderableLayers(childLayers));
    }

    return renderableLayers;
  }

  createMetadata() {
    const dnaSet = new Set();
    const data: Metadata[] = [];
    let _duplicateThreshold = this.duplicateThreshold;

    for (let tokenId = 0; tokenId < this.size; tokenId++) {
      const renderableLayers = this.getRenderableLayers(this.layers);
      if (renderableLayers.length) {
        const dna = this.getDna(renderableLayers);
        if (!dnaSet.has(dna)) {
          data.push({
            name: String(tokenId),
            attributes: this.getAttributes(renderableLayers),
            dna,
          });
          dnaSet.add(dna);
        } else if (dnaSet.has(dna) && _duplicateThreshold > 0) {
          _duplicateThreshold -= 1;
          tokenId -= 1;
        } else {
          // too many duplicates
          break;
        }
      }
    }

    this.metadata = data;
  }

  getMetadata(): Metadata[] {
    return this.metadata;
  }
}
