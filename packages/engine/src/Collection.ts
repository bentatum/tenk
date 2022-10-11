// import sha256 from "./lib/sha256";
// import { Layer } from "./Layer";
// import cannotAccompanyFilter from "./lib/cannotAccompanyFilter";
// import mustAccompanyFilter from "./lib/mustAccompanyFilter";
// import { CollectionConfig, LayerConfig, Metadata } from "./types";
// import { Attribute } from "./Attribute";

// export class Collection {
//   private layers: Layer[];
//   private readonly duplicateThreshold: number;
//   private readonly size: number;
//   private metadata: Metadata[];

//   constructor(layers: LayerConfig[], options?: CollectionConfig) {
//     this.layers = layers.map((layer) => new Layer(layer));
//     this.size = options?.size || 10000;
//     this.duplicateThreshold = options?.duplicateThreshold || 100;
//     this.createMetadata();
//     this.getAttributes = options?.getAttributes || this.getAttributes;
//   }

//   getDna(layers: Layer[]): string {
//     const message = layers.reduce(
//       (acc, { selectedElement, bypassDNA }, index) => {
//         if (!bypassDNA && selectedElement) {
//           acc += selectedElement.name;
//         }
//         return acc;
//       },
//       ""
//     );
//     return sha256(message);
//   }

//   getAttributes(layers: Layer[]): Attribute[] {
//     return layers.map(
//       (layer) =>
//         new Attribute({
//           trait_type: layer.name,
//           value: layer.selectedElement?.name,
//         })
//     );
//   }

//   filterByOdds(layers: Layer[]): Layer[] {
//     return layers.filter((layer) => {
//       const odds = layer.odds;
//       return odds === 0 ? false : odds === 1 || Math.random() < odds;
//     });
//   }

//   getRenderableLayers(layers: Layer[]): Layer[] {
//     const renderableLayers = this.filterByOdds(layers)
//       .map((layer) => layer.selectElement())
//       .filter((layer) => layer.selectedElement);

//     if (
//       !renderableLayers.every(cannotAccompanyFilter) ||
//       !renderableLayers.every(mustAccompanyFilter)
//     ) {
//       throw new Error();
//     }

//     const childLayers: Layer[] = renderableLayers
//       .map((layer) => layer.getChildLayers())
//       .flat() as Layer[];

//     if (childLayers.length) {
//       renderableLayers.push(...this.getRenderableLayers(childLayers));
//     }

//     return renderableLayers;
//   }

//   createMetadata() {
//     const dnaSet = new Set();
//     const data: Metadata[] = [];
//     let _duplicateThreshold = this.duplicateThreshold;

//     for (let tokenId = 0; tokenId < this.size; tokenId++) {
//       let renderableLayers;

//       try {
//         renderableLayers = this.getRenderableLayers(this.layers);
//       } catch {
//         tokenId -= 1;
//         continue;
//       }

//       if (renderableLayers.length) {
//         const dna = this.getDna(renderableLayers);
//         if (!dnaSet.has(dna)) {
//           data.push({
//             name: String(tokenId),
//             attributes: this.getAttributes(renderableLayers),
//             dna,
//           });
//           dnaSet.add(dna);
//         } else if (dnaSet.has(dna) && _duplicateThreshold > 0) {
//           _duplicateThreshold -= 1;
//           tokenId -= 1;
//           continue;
//         } else {
//           // too many duplicates
//           break;
//         }
//       }
//     }

//     this.metadata = data;
//   }

//   getMetadata(): Metadata[] {
//     return this.metadata;
//   }
// }
