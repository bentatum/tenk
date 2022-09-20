import { Collection } from "./Collection";
import { CollectionConfig, LayerConfig, Metadata } from "./types";

export * from "./Collection";
export * from "./Layer";
export * from "./LayerElement";
export * from "./types";

export default (
  layers: LayerConfig[],
  options: CollectionConfig
): Metadata[] => {
  return new Collection(layers, options).getMetadata();
};
