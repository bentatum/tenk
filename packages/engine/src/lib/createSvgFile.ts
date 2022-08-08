import fs from 'fs';
import { Config, Layer } from '../types';
import { parse as parseHtml, HTMLElement } from 'node-html-parser';

const loadLayerSvg = (layer: Layer) => {
  return parseHtml(
    fs.readFileSync(layer.selectedElement?.path!).toString()
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
  svgElementGroups.forEach(([g, layer]) => {
    if (layer.htmlAttributes) {
      g.setAttributes(layer.htmlAttributes);
    }
    svgElement?.appendChild(g);
  });
  const svgFile = String(svgElement?.toString());
  fs.writeFileSync(path, svgFile);
};

export default createSvgFile;
