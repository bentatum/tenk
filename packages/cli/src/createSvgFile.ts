import fs from 'fs';
import { Layer } from '@tenk/engine';
import { parse as parseHtml, HTMLElement } from 'node-html-parser';
import { Config } from './types';
import { attributesDir } from './env';

const loadLayerSvg = (layer: Layer) => {
  return parseHtml(
    fs.readFileSync(`${attributesDir}/${layer.name}/${layer.selectedElement?.name}`).toString()
  ).querySelector('g');
};

const getSvgElementGroups = (layers: Layer[]): Array<[HTMLElement, Layer]> => {
  return layers
    .map(layer => {
      const g = loadLayerSvg(layer);
      if (g) {
        return [g, layer];
      }
      return false;
    })
    .filter(Boolean) as Array<[HTMLElement, Layer]>;
};

const createSvgFile = (config: Config, path: string, layers: Layer[]): void => {
  const svgElementGroups = getSvgElementGroups(layers);
  const svgElementRoot = parseHtml(
    `<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="${config.viewBox}" height="${config.renderHeight}" width="${config.renderWidth}"></svg>`
  );
  const svgElement = svgElementRoot.querySelector('svg');
  svgElementGroups.forEach(([g]) => {
    // if (layer.htmlAttributes) {
    //   g.setAttributes(layer.htmlAttributes);
    // }
    svgElement?.appendChild(g);
  });
  const svgFile = String(svgElement?.toString());
  fs.writeFileSync(path, svgFile);
};

export default createSvgFile;
