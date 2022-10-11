import fs from "fs";
import { Attribute, Factory } from "@/interfaces";
import { LayerDirectory } from "./LayerDirectory";
import { parse as parseHtml, HTMLElement } from "node-html-parser";
import { injectable } from "inversify";
import { buildDir } from "@/env";

@injectable()
export class SvgFile implements Factory {
  getHtmlElement(attribute: Attribute) {
    return parseHtml(fs.readFileSync(`${attribute.metadata.path}`).toString());
  }

  getLayerGroupElement(attribute: Attribute) {
    return this.getHtmlElement(attribute).querySelector("g");
  }

  getSvgGroupElements(attributes: Attribute[]) {
    return attributes
      .map((attribute) => this.getLayerGroupElement(attribute))
      .filter(Boolean);
  }

  getViewBox(attribute: Attribute) {
    return this.getHtmlElement(attribute)
      .querySelector("svg")
      .getAttribute("viewBox");
  }

  create(attributes: Attribute[], renderPath: string) {
    const svgGroupElements = this.getSvgGroupElements(attributes);
    const svgRootElement = parseHtml(
      `<svg
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${this.getViewBox(attributes[0])}"
        height="${attributes[0].metadata.height}"
        width="${attributes[0].metadata.width}">
      </svg>`
    );
    const svgElement = svgRootElement.querySelector("svg");
    svgGroupElements.forEach((g, i) => {
      if (attributes[i].metadata.svgAttributes) {
        g.setAttributes(attributes[i].metadata.svgAttributes);
      }
      svgElement?.appendChild(g);
    });
    const svgFile = String(svgElement?.toString());
    fs.writeFileSync(renderPath, svgFile);
  }
}
