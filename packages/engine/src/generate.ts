import createDna from './lib/createDna';
import getAttributes from './lib/getAttributes';
import getMetadata from './lib/getMetadata';
import mapSelectedElementsToLayers from './lib/mapSelectedElementsToLayers';
import { Layer, Metadata } from './types';

const generate = (
  layers: Layer[],
  size: number = 10000
): Metadata[] => {
  let tokenId = 0;
  const dnaSet = new Set();
  const data: Metadata[] = [];

  while (tokenId <= size) {
    const [renderableLayers, nonRenderableLayers] = mapSelectedElementsToLayers(
      layers,
      tokenId
    );

    const dna = createDna(renderableLayers);

    if (dna && !dnaSet.has(dna) && renderableLayers.length) {
      const attributes = getAttributes([
        ...renderableLayers,
        ...nonRenderableLayers,
      ]);
      data.push(getMetadata(dna, tokenId, attributes));
      dnaSet.add(dna);
    }

    tokenId += 1;
  }

  return data;
};

export default generate;
