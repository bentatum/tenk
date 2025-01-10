import { container } from "./inversify.config";
import { Collection, LayerConfig, Metadata, Options } from "./interfaces";

export type { Metadata, Options, LayerConfig, ElementConfig, Attribute } from "./interfaces";

export default (layers: LayerConfig[], options?: Options): Metadata[] => {
  const collection = container.get<Collection>("Collection");
  return collection.create(layers, options ?? {});
};
