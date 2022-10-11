#!/usr/bin/env node

// import {container} from "tsyringe";
// import { Collection } from "./Collection";
import tenk from "@tenk/engine";
import yargs from "yargs";
import { Project } from "./interfaces";
import { container } from "./inversify.config";

// import fs from "fs";
// import setup from "./setup";
// import tenk, { LayerElementConfig, LayerConfig, Layer } from "@tenk/engine";
// import { buildDir, cwd, layersDir } from "./env";
// import createPngFile from "./createPngFile";
// import sizeOf from "image-size";
// import { createCanvas } from "canvas";
// import yargs from "yargs";
// import cliProgress from "cli-progress";
// import createSvgFile from "./createSvgFile";
// import AttributeFile from "./AttributeFile";
// import LayerElementFile from "./LayerElementFile";
// import { LayerDirectory } from "./LayerDirectory";
// import { Collection } from "./Collection";

const getArgs = (): [number] => {
  const args = yargs(process.argv.slice(2)).argv as any;
  const size = Number(args._[0] || 10000);
  return [size];
};

(async () => {
  const project = container.get<Project>("Project");
  await project.create(...getArgs());

  // const metadata = tenk(layers, {
  //   size,
  //   getAttributes(layers: Layer[]) {
  //     // _imgWidth: layer.selectedElement?.imgWidth,
  //     // _imgHeight: layer.selectedElement?.imgHeight,
  //     // _imgPath: layer.selectedElement?.imgPath,
  //     return layers.map(
  //       (layer) =>
  //         new AttributeFile(
  //           {
  //             trait_type: layer.name,
  //             value: layer.selectedElement?.name,
  //           },
  //           {
  //             height: layer.selectedElement?.height,
  //           }
  //         )
  //     );
  //   },
  // });

  // const progressBar = new cliProgress.SingleBar(
  //   {
  //     format: "{bar} {value}/{total} {percentage}% | ETA: {eta}s",
  //   },
  //   cliProgress.Presets.shades_classic
  // );

  // progressBar.start(metadata.length, 0);

  // const canvas = createCanvas(
  //   metadata[0].attributes[0]._imgWidth!,
  //   metadata[0].attributes[0]._imgHeight!
  // );

  // const canvasContext = canvas.getContext("2d");

  // for (let i = 0; i < metadata.length; i++) {
  //   // if file type is svg, create an svg first
  //   createSvgFile(layers);
  //   // then convert it to png
  //   await createPngFile(metadata[i], canvas, canvasContext);
  //   progressBar.increment();
  //   progressBar.update(i + 1);
  // }

  // fs.writeFileSync(
  //   `${buildDir}/metadata.json`,
  //   JSON.stringify(
  //     metadata.map((data) => ({
  //       ...data,
  //       attributes: data.attributes.map((attr) =>
  //         Object.keys(attr)
  //           .filter((key) => !key.startsWith("_"))
  //           .reduce((obj, key) => {
  //             obj[key] = attr[key];
  //             return obj;
  //           }, {})
  //       ),
  //     }))
  //   )
  // );

  // progressBar.stop();
})();
