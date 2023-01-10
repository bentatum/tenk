import fs from "fs";
import { Attribute, Factory, File } from "@/interfaces";
import { parse as parseHtml } from "node-html-parser";
import { injectable } from "inversify";

@injectable()
export class SvgFile implements Factory, File {
  path: string;

  readAttributeFile(attribute: Attribute) {
    return fs.readFileSync(attribute.metadata.path);
  }

  getHtmlElement(attribute: Attribute) {
    return parseHtml(this.readAttributeFile(attribute).toString());
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

  create(attributes: Attribute[], path: string): SvgFile {
    this.path = path;
    const viewBox = this.getViewBox(attributes[0]);
    const svgRootElement = parseHtml(
      `<svg
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${viewBox}"
        height="${attributes[0].metadata.height}"
        width="${attributes[0].metadata.width}">
      </svg>`
    );
    const svgElement = svgRootElement.querySelector("svg");
    const svgGroupElements = this.getSvgGroupElements(attributes);
    svgGroupElements.forEach((g, i) => {
      if (attributes[i].metadata.svgAttributes) {
        g.setAttributes(attributes[i].metadata.svgAttributes);
      }
      svgElement.appendChild(g);
    });
    fs.writeFileSync(path, svgElement.toString());
    return this;
  }

  delete() {
    if (!this.path) {
      throw new Error("path is not defined");
    }
    fs.rmSync(this.path);
  }
}
