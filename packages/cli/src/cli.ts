#!/usr/bin/env node

import fs from "fs";
import path from "path";
import setup from "./setup";
import tenk, { LayerElementConfig, LayerConfig } from "@tenk/engine";
import { buildDir, cwd, layersDir } from "./env";
import createPngFile from "./createPngFile";
import sizeOf from "image-size";
import { createCanvas } from "canvas";
import yargs from "yargs";
import cliProgress from "cli-progress";

const getLayerElements = async (layerName): Promise<LayerElementConfig[]> => {
  const layerDir = `${layersDir}/${layerName}`;

  const layerFiles = (
    await fs.promises.readdir(layerDir, { withFileTypes: true })
  )
    .filter((dirent) => dirent.isFile() && path.extname(dirent.name) === ".png")
    .map((dirent) => dirent.name);

  return layerFiles.map((fileName) => {
    const imgPath = `${layerDir}/${fileName}`;
    const dimensions = sizeOf(imgPath);
    return {
      name: fileName.replace(".png", ""),
      weight: 1,
      imgPath,
      imgWidth: dimensions.width,
      imgHeight: dimensions.height,
    };
  });
};

type Config = Record<string, LayerConfig>;

const getLayers = async (config?: Config): Promise<LayerConfig[]> => {
  const layerFolders = (
    await fs.promises.readdir(layersDir, { withFileTypes: true })
  )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return await Promise.all(
    layerFolders.map(async (layerName) => {
      let layerConfig: Partial<LayerConfig> = {};
      if (config && config[layerName]) {
        layerConfig = config[layerName];
      }
      return {
        odds: 1,
        name: layerName,
        elements: await getLayerElements(layerName),
        ...layerConfig,
      };
    })
  );
};

const getConfig = () => {
  const configPath = fs
    .readdirSync(cwd)
    .find((file) => file.includes("tenk.config"));
  if (configPath) {
    return require(`${cwd}/${configPath}`);
  }
};

(async () => {
  const args = yargs(process.argv.slice(2)).argv as any;
  const size = Number(args._[0] || 10000);

  setup();

  const config = getConfig() as Config | undefined;
  const layers = await getLayers(config);
  const metadata = tenk(layers, { size });
  console.log(metadata.map(x => x.attributes))

  const progressBar = new cliProgress.SingleBar(
    {
      format: "{bar} {value}/{total} {percentage}% | ETA: {eta}s",
    },
    cliProgress.Presets.shades_classic
  );

  progressBar.start(metadata.length, 0);

  const canvas = createCanvas(
    metadata[0].attributes[0]._imgWidth!,
    metadata[0].attributes[0]._imgHeight!
  );
  const canvasContext = canvas.getContext("2d");
  for (let i = 0; i < metadata.length; i++) {
    await createPngFile(metadata[i], canvas, canvasContext);
    progressBar.increment();
    progressBar.update(i + 1);
  }

  fs.writeFileSync(
    `${buildDir}/metadata.json`,
    JSON.stringify(
      metadata.map((data) => ({
        ...data,
        attributes: data.attributes.map((attr) =>
          Object.keys(attr)
            .filter((key) => !key.startsWith("_"))
            .reduce((obj, key) => {
              obj[key] = attr[key];
              return obj;
            }, {})
        ),
      }))
    )
  );

  progressBar.stop();

  // render based on metadata
  // metadata.forEach(({ edition, attributes }) => {
  //   const svgPath = `${buildDir}/svg/${edition}.svg`;
  //   createSvgFile(
  //     config,
  //     svgPath,
  //     attributes.map(({ trait_type, value }) => ({
  //       name: String(trait_type || value),
  //       selectedElement: {
  //         name: String(value),
  //       },
  //     }))
  //   );
  // });
})();
