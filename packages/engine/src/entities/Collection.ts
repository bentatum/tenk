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
  size!: number;
  duplicateThreshold!: number;
  brokenRuleThreshold!: number;
  layers!: Layer[];
  metadata!: Metadata[];
  disableDna!: boolean;

  modifyLayers?(
    tokenLayers: Layer[],
    tokenId: number,
    allLayers: Layer[]
  ): Layer[];

  modifyMetadata?(
    tokenId: number,
    attributes: Attribute[],
    tokenLayers: Layer[],
    dna: string
  ): Metadata;

  constructor(
    @inject("Factory<Layer>")
    public layerFactory: () => Layer
  ) {}

  create(
    layerConfigurations: LayerConfig[],
    {
      brokenRuleThreshold = 1000000,
      duplicateThreshold = 100,
      size = 10000,
      modifyLayers,
      modifyMetadata,
      disableDna = false,
    }: Options = {}
  ) {
    this.layers = layerConfigurations.map((layer) =>
      this.layerFactory().create(layer)
    );
    this.brokenRuleThreshold = brokenRuleThreshold;
    this.duplicateThreshold = duplicateThreshold;
    this.size = size;
    this.modifyLayers = modifyLayers;
    this.modifyMetadata = modifyMetadata;
    this.disableDna = disableDna;
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

  chooseLayers(layers: Layer[]): Layer[] {
    return this.filterByOdds(layers)
      .map((layer) => layer.selectElement())
      .filter((layer) => layer.isRenderable())
      .reduce<Layer[]>((acc, next) => {
        const childLayers = next.getChildLayers();
        if (childLayers.length) {
          acc.push(...this.chooseLayers(childLayers));
        } else {
          acc.push(next);
        }
        return acc;
      }, [])
      .filter((layer) => layer.selectedElement);
  }

  getRenderableLayers(layers: Layer[], tokenId: number): Layer[] {
    const renderableLayers = this.chooseLayers(layers);
    this.throwIfLayersBreakRules(renderableLayers);
    if (this.modifyLayers) {
      // modify token layers
      return this.modifyLayers(renderableLayers, tokenId, this.layers);
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

  mapLayerAttributes(
    layer: Layer,
    tokenLayers: Layer[],
    dna?: string
  ): Attribute[] {
    if (!layer.selectedElement) {
      throw new Error("Layer must have a selected element");
    }

    let attrs: Array<Attribute | null> = [];

    if (layer.attribute) {
      const singleOrList = layer.attribute(layer, tokenLayers, dna!);
      if (Array.isArray(singleOrList)) {
        attrs.push(...singleOrList.map((attr) => (!attr ? {} : attr)));
      } else {
        attrs.push(singleOrList ?? {});
      }
    } else {
      attrs.push({
        trait_type: layer.displayName || layer.name,
        value: layer.selectedElement.name,
      });
    }

    if (layer.selectedElement.metadata) {
      attrs.forEach((attr) => {
        attr!.metadata = layer.selectedElement?.metadata;
      });
    }

    return attrs as Attribute[];
  }

  renderTokenData(tokenId: number, renderableLayers: Layer[], dna?: string) {
    const attributes = renderableLayers
      .map((layer) => this.mapLayerAttributes(layer, renderableLayers, dna))
      .flat();
    return {
      name: String(tokenId),
      attributes,
      ...this.modifyMetadata?.(tokenId, attributes, renderableLayers, dna!),
    };
  }

  generateMetadata() {
    const dnaSet = new Set();
    const data: Metadata[] = [];

    let _duplicateThreshold = this.duplicateThreshold;
    let _brokenRuleThreshold = this.brokenRuleThreshold;

    for (let tokenId = 0; tokenId < this.size; tokenId++) {
      let renderableLayers: Layer[] = [];

      try {
        renderableLayers = this.getRenderableLayers(this.layers, tokenId);
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

      if (renderableLayers.length && this.disableDna) {
        data.push(this.renderTokenData(tokenId, renderableLayers) as Metadata);
      } else if (renderableLayers.length) {
        const dna = this.getDna(renderableLayers);
        if (!dnaSet.has(dna)) {
          data.push(this.renderTokenData(tokenId, renderableLayers, dna) as Metadata);
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
