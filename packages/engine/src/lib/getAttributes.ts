import { Layer, TokenAttribute } from '../types';

// A layer can produce multiple attributes
const mapAttributes = (
  layer: Layer,
  index: number,
  allLayers: Layer[]
): TokenAttribute[] => {
  if (layer.metaDataIgnore) {
    return [];
  }
  if (layer.mapAttributes) {
    return layer.mapAttributes(layer, index, allLayers);
  }
  if (!layer.selectedElement) {
    return [];
  }
  return [
    {
      trait_type: layer.name,
      value: layer.selectedElement.name,
    },
  ];
};

const getAttributes = (allLayers: Layer[]): TokenAttribute[] => {
  return allLayers.map(mapAttributes).flat() as TokenAttribute[];
};

export default getAttributes;
