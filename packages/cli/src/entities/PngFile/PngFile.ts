import fs from "fs";
import { Attribute, Factory } from "@/interfaces";
import {
  Canvas,
  createCanvas,
  loadImage,
  CanvasRenderingContext2D,
} from "canvas";
import { injectable } from "inversify";

@injectable()
export class PngFile implements Factory {
  canvas: Canvas;
  canvasContext: CanvasRenderingContext2D;

  setupCanvas(height: number, width: number) {
    this.canvas = createCanvas(width, height);
    this.canvasContext = this.canvas.getContext("2d");
  }

  async create(attributes: Attribute[], renderPath: string, loadPath?: string) {
    this.setupCanvas(attributes[0].metadata.height, attributes[0].metadata.width);
    for (let i = 0; i < attributes.length; i++) {
      const img = await loadImage(loadPath || attributes[i].metadata.path);
      this.canvasContext.drawImage(
        img,
        0,
        0,
        attributes[i].metadata.width,
        attributes[i].metadata.height
      );
    }
    fs.writeFileSync(renderPath, this.canvas.toBuffer("image/png"));
  }
}
