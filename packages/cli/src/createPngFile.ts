import fs from "fs";
import { Canvas, loadImage, CanvasRenderingContext2D } from "canvas";
import { Metadata } from "@tenk/engine";
import { buildDir } from "./env";

const createPngFile = async (
  { name, attributes }: Metadata,
  canvas: Canvas,
  canvasContext: CanvasRenderingContext2D
): Promise<void> => {
  for (let i = 0; i < attributes.length; i++) {
    const img = await loadImage(attributes[i]._imgPath!);
    canvasContext.drawImage(
      img,
      0,
      0,
      attributes[i]._imgWidth,
      attributes[i]._imgHeight
    );
  }

  fs.writeFileSync(
    `${buildDir}/png/${name}.png`,
    canvas.toBuffer("image/png")
  );
};

export default createPngFile;
