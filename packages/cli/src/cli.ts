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
    .filter(
      (dirent) =>
        dirent.isFile() && [".png", ".svg"].includes(path.extname(dirent.name))
    )
    .map((dirent) => dirent.name);

  const fileType = path.extname(layerFiles[0]);

  return layerFiles.map((fileName) => {
    const imgPath = `${layerDir}/${fileName}`;
    const dimensions = sizeOf(imgPath);
    return {
      name: fileName.replace(fileType, ""),
      weight: 1,
      imgPath,
      imgWidth: dimensions.width,
      imgHeight: dimensions.height,
    };
  });
};

type Config = Record<string, LayerConfig>;

const parseLayerName = (layerName: string): [string, number] => {
  let odds = 1;
  let _layerName = layerName;
  // if the layer name starts with a number,
  // it's the order of the layer, let's remove it.
  if (_layerName.match(/^([0-9]+_)/)) {
    _layerName = _layerName.replace(/^([0-9]+_)/, "");
  }
  // if the layer name ends with a number,
  // it's the weight of the layer, let's remove it.
  if (_layerName.match(/(#[0-9]+)$/)) {
    odds = Number(_layerName.split("#")[1]) / 100;
    _layerName = _layerName.replace(/(#[0-9]+)$/, "");
  }
  return [_layerName, odds];
};

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

      const [name, odds] = parseLayerName(layerName);

      return {
        odds,
        name,
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
})();
