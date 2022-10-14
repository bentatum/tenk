import fs from "fs";
import { Attribute, Factory, TenkConfig } from "@/interfaces";
import { injectable, inject } from "inversify";
import { buildDir, cwd, layersDir } from "@/env";
import { Layer } from "./Layer";
import tenk, { Metadata } from "@tenk/engine";
import { SvgFile } from "./SvgFile";
import { PngFile } from "./PngFile";
import cliProgress from "cli-progress";

@injectable()
export class Collection implements Factory {
  size: number;
  layers: Layer[];
  config?: TenkConfig;

  constructor(
    @inject("Factory<Layer>")
    public LayerFactory: () => Layer,
    @inject("SvgFile")
    public svgFile: SvgFile,
    @inject("PngFile")
    public pngFile: PngFile
  ) {}

  async create(size: number) {
    this.setupWorkspace();
    this.setConfig();
    this.size = size;
    const folders = this.getLayerDirNames();
    this.layers = folders.map((name) =>
      this.LayerFactory().create(name, this.config)
    );
    const fileType = this.layers[0].getFileType();
    const metadata = tenk(this.layers, {
      size: this.size,
    });

    if (!metadata.length) {
      console.log('No metadata generated. Check your layers for errors.');
      return;
    }

    const progressBar = new cliProgress.SingleBar(
      {
        format: "{bar} {value}/{total} {percentage}%",
      },
      cliProgress.Presets.legacy
    );

    progressBar.start(metadata.length, 0);

    this.pngFile.setupCanvas(
      metadata[0].attributes[0].metadata.height,
      metadata[0].attributes[0].metadata.width
    );

    for (let i = 0; i < metadata.length; i++) {
      if (fileType === "svg") {
        // if file type is svg, create an svg first
        // so we can apply top level user defined attributes
        const svgPath = `${buildDir}/svg/${i}.svg`;
        const pngPath = `${buildDir}/png/${i}.png`;
        const attributes = metadata[i].attributes as Attribute[];
        this.svgFile.create(attributes, svgPath);
        // then create the png
        await this.pngFile.create(attributes, pngPath, svgPath);
      }
      this.writeSingleMetadata(metadata[i], i);
      progressBar.increment();
      progressBar.update(i + 1);
    }

    progressBar.stop();

    this.writeMetadata(metadata);
  }

  mapAttribute({ metadata, ...attr }: Attribute) {
    // filter out metadata
    return attr;
  }

  mapMetadata({ dna, ...metadata }: Metadata) {
    return {
      ...metadata,
      attributes: metadata.attributes.map(this.mapAttribute),
    };
  }

  writeSingleMetadata(metadata: Metadata, index: number) {
    fs.writeFileSync(
      `${buildDir}/json/${index}.json`,
      JSON.stringify(this.mapMetadata(metadata))
    );
  }

  writeMetadata(metadata: Metadata[]) {
    fs.writeFileSync(
      `${buildDir}/metadata.json`,
      JSON.stringify(metadata.map(this.mapMetadata))
    );
  }

  getLayerDirNames(): string[] {
    return fs
      .readdirSync(layersDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  }

  setConfig() {
    const configPath = fs
      .readdirSync(cwd)
      .find((file) => file.includes("tenk.config"));
    if (configPath) {
      this.config = require(`${cwd}/${configPath}`);
    }
  }

  setupWorkspace() {
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/png`);
    fs.mkdirSync(`${buildDir}/svg`);
  }
}
