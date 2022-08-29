// import fs from 'fs';
// import { layersDir } from '../env';
import { Layer } from '../types';

// const cleanName = (filename: string, config: Config): string => {
//   return String(
//     filename
//       .slice(0, -4)
//       .split(config.rarityDelimiter)
//       .shift()
//   );
// };

// const getFileExt = (filename: string) => {
//   const splitPath = filename.split('.');
//   return splitPath[splitPath.length - 1];
// };

// const getRarityWeight = (fileName: string, config: Config): number => {
//   let weight = Number(
//     fileName
//       .slice(0, -4)
//       .split(config.rarityDelimiter)
//       .pop()
//   );
//   if (isNaN(weight)) {
//     weight = 1;
//   }
//   return weight;
// };

// const getElements = (path: string, config: Config): LayerElement[] => {
//   return fs
//     .readdirSync(path)
//     .filter(item => item.match(new RegExp(config.sourceType, 'g')))
//     .map((i, index) => {
//       if (i.includes('-')) {
//         throw new Error(`layer name can not contain dashes, please fix: ${i}`);
//       }
//       return {
//         id: index,
//         name: cleanName(i, config),
//         filename: i,
//         ext: getFileExt(i),
//         path: `${path}${i}`,
//         weight: getRarityWeight(i, config),
//       };
//     });
// };

export const parseLayers = (layers: Layer[]): Layer[] => {
  return layers.map((layer) => ({
    ...layer,
    // id: index,
    // elements: getElements(`${layersDir}/${layer.name}/`, config),
    odds: layer.odds || 1,
  }));
};
