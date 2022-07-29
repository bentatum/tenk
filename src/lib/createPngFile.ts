import fs from 'fs';
import { Canvas, CanvasRenderingContext2D, loadImage } from 'canvas';
import { buildDir } from '../env';
import { Config, Layer} from '../types';

const createPngFile = async (
  layers: Layer[],
  config: Config,
  canvas: Canvas,
  ctx: CanvasRenderingContext2D,
  editionCount: number
): Promise<void> => {
  ctx.clearRect(0, 0, config.renderWidth, config.renderHeight);

  for (const layer of layers) {
    const img = await loadImage(layer.selectedElement?.path!);
    ctx.drawImage(img, 0, 0, config.renderWidth, config.renderHeight);
  }

  fs.writeFileSync(
    `${buildDir}/png/${editionCount}.png`,
    canvas.toBuffer('image/png')
  );
};

export default createPngFile;
