import createDna from './lib/createDna';
// import createPngFile from './lib/createPngFile';
// import createSvgFile from './lib/createSvgFile';
// import createSvgFile from './lib/createSvgFile';
import getAttributes from './lib/getAttributes';
import getMetadata from './lib/getMetadata';
import mapSelectedElementsToLayers from './lib/mapSelectedElementsToLayers';
import { parseLayers } from './lib/parseLayers';
import { Metadata, Options } from './types';
import { getConfig } from './utils';

// const createPngFile = async (
//   svgPath: string,
//   editionCount: number
// ): Promise<void> => {
//   ctx.clearRect(0, 0, config.renderWidth, config.renderHeight);
//   const image = await loadImage(svgPath);
//   ctx.drawImage(image, 0, 0, config.renderHeight, config.renderWidth);
//   const pngPath = `${buildDir}/png/${editionCount}.png`;
//   fs.writeFileSync(pngPath, canvas.toBuffer('image/png'));
// };

const generate = async (options: Options): Promise<Metadata[]> => {
  const dnaSet = new Set();
  const allMetadata: Metadata[] = [];
  const config = getConfig(options);
  //   const canvas = createCanvas(config.renderWidth, config.renderHeight);
  //   const canvasRenderingContext = canvas.getContext('2d');

  let cumulativeSize = 0;
  let editionCount = 0;

  for (
    let editionIndex = 0;
    editionIndex < config.editions.length;
    editionIndex++
  ) {
    let edition = config.editions[editionIndex];
    // if (config.verbose) {
    //   console.log(`Edition #${editionIndex}: `, edition);
    // }

    let layers = parseLayers(edition.layers, config);
    // let layers: Layer[] = [];

    // if (config.verbose) {
    //   console.log('Layer count: ', layers.length);
    // }

    cumulativeSize += edition.size;
    // if (config.verbose) {
    //   console.log('Cumulative size: ', cumulativeSize);
    // }

    // if (config.verbose) {
    //   console.log(`Rendering edition #${editionIndex + 1}`, {
    //     editionCount,
    //     cumulativeSize,
    //     layers,
    //   });
    // }

    console.log({ editionCount, cumulativeSize });
    while (editionCount < cumulativeSize) {
      const [
        renderableLayers,
        nonRenderableLayers,
      ] = mapSelectedElementsToLayers(layers, editionCount);

      // if (config.verbose) {
      //   console.log('Renderable layers', renderableLayers);
      //   console.log('Non-renderable layers', nonRenderableLayers);
      // }

      const dna = createDna(renderableLayers);
      // if (config.verbose) {
      //   console.log('DNA: ', dna);
      // }

      //   if (!dna || dna && dnaSet.has(dna) || !renderableLayers.length) {

      //   }

      if (dna && !dnaSet.has(dna) && renderableLayers.length) {
        // if (config.renderImages) {
        // if (config.sourceType === 'png') {
        //   await createPngFile(
        //     renderableLayers,
        //     config,
        //     canvas,
        //     canvasRenderingContext,
        //     editionCount
        //   );
        // }
        // if (config.sourceType === 'svg') {
        //   const svgPath = `${buildDir}/svg/${editionCount}.svg`;
        //   createSvgFile(config, svgPath, renderableLayers);
        // }
        // }

        let attributes = getAttributes([
          ...renderableLayers,
          ...nonRenderableLayers,
        ]);

        let metadata = getMetadata(
          config,
          dna,
          editionCount,
          attributes,
          edition.attributes
        );

        allMetadata.push(metadata);

        // if (config.renderTokenMetadataJson) {
        //   fs.writeFileSync(
        //     `${buildDir}/json/${editionCount}.json`,
        //     JSON.stringify(metadata, null, 2)
        //   );
        // }

        dnaSet.add(dna);
      }

      editionCount += 1;
    }
  }

  console.log('writing final metadata', allMetadata.length);

  return allMetadata;

  //   fs.writeFileSync(
  //     `${buildDir}/json/_metadata.json`,
  //     JSON.stringify(Array.from(allMetadata), null, 2)
  //   );
};

export default generate;
