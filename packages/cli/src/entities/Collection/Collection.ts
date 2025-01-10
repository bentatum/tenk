import fs from "fs";
import { Attribute, Factory, FileType } from "@/interfaces";
import { injectable, inject } from "inversify";
import { assetsDir, buildDir, layersDir } from "@/env";
import { Layer } from "../Layer";
import tenk, { Metadata } from "@tenk/engine";
import { SvgFile } from "../SvgFile";
import { PngFile } from "../PngFile";
import cliProgress from "cli-progress";
import { Config } from "../Config";
import { Logger } from "../Logger";
import { extname } from "path";

@injectable()
export class Collection implements Factory {
  size!: number;
  layers!: Layer[];
  fileType!: FileType;

  constructor(
    @inject("Config")
    public config: Config,
    @inject("Logger")
    public logger: Logger,
    @inject("Factory<Layer>")
    public layerFactory: () => Layer,
    @inject("Factory<SvgFile>")
    public svgFileFactory: () => SvgFile,
    @inject("PngFile")
    public pngFile: PngFile
  ) {}

  createLayers() {
    const folders = this.getLayerDirNames();

    this.logger.verbose(
      "Found layer folders...",
      `Layers directory set to: ${layersDir}`,
      folders
    );

    this.layers = (folders ?? []).map((name) => this.layerFactory().create(name));
  }

  async create() {
    this.setupWorkspace();
    this.createLayers();

    this.fileType = this.layers[0]?.getFileType() ?? FileType.PNG;

    const options = {
      size: this.config.get("size"),
      modifyLayers: this.config.get("modifyLayers"),
      modifyMetadata: this.config.get("modifyMetadata"),
      disableDna: this.config.get("disableDna"),
    };

    this.logger.verbose(
      "Creating collection...",
      this.layers,
      { fileType: this.fileType },
      options
    );

    const metadata = tenk(this.layers, options);

    if (!metadata.length) {
      console.warn("No metadata generated. Check your layers for errors.");
      return process.exit();
    }

    const progressBar = new cliProgress.SingleBar(
      {
        format: "{bar} {value}/{total} {percentage}%",
      },
      cliProgress.Presets.legacy
    );

    progressBar.start(metadata.length, 0);

    const formats = this.config.get("formats");

    if (!formats || formats.includes("png")) {
      this.pngFile.setupCanvas(
        // @ts-expect-error todo
        metadata[0].attributes[0].metadata.height,
        // @ts-expect-error todo
        metadata[0].attributes[0].metadata.width
      );
    }

    for (let i = 0; i < metadata.length; i++) {
      if (this.fileType === FileType.SVG) {
        // if file type is svg, create an svg first
        // so we can apply top level user defined attributes
        const svgPath = `${assetsDir}/${i}.svg`;
        const pngPath = `${assetsDir}/${i}.png`;
        // @ts-expect-error todo
        const attributes = metadata[i].attributes as Attribute[];
        const svgFile = this.svgFileFactory().create(attributes, svgPath);
        if (!formats || formats.includes("png")) {
          await this.pngFile.create(attributes, pngPath, svgPath);
          if (formats && !formats.includes("svg")) {
            svgFile.delete();
          }
        }
      } else if (this.fileType === FileType.PNG) {
        const pngPath = `${assetsDir}/${i}.png`;
        // @ts-expect-error todo
        const attributes = metadata[i].attributes as Attribute[];
        await this.pngFile.create(attributes, pngPath);
      }
      // @ts-expect-error todo
      this.writeSingleMetadata(metadata[i], i);
      progressBar.increment();
      progressBar.update(i + 1);
    }

    progressBar.stop();

    this.writeCollectionJson();
    this.writeMetadataJson(metadata);
  }

  mapAttribute({ metadata, ...attr }: Attribute) {
    // filter out metadata
    return attr;
  }

  mapMetadata(metadata: Metadata) {
    return {
      ...metadata,
      attributes: metadata.attributes
        // @ts-expect-error todo
        .map(this.mapAttribute)
        .filter((attr) => attr.trait_type || attr.value),
    };
  }

  writeSingleMetadata(metadata: Metadata, index: number) {
    fs.writeFileSync(
      `${assetsDir}/${index}.json`,
      JSON.stringify(this.mapMetadata(metadata))
    );
  }

  writeCollectionJson() {
    const image = this.config.get("image");
    const imgExt = image && extname(image) === ".svg" ? ".svg" : ".png";
    const imgMimeTypes = {
      ".png": "image/png",
      ".svg": "image/svg+xml",
    };
    fs.writeFileSync(
      `${assetsDir}/collection.json`,
      JSON.stringify({
        name: this.config.get("name"),
        symbol: this.config.get("symbol"),
        description: this.config.get("description"),
        image: this.config.get("image"),
        attributes: [],
        properties: {
          files: [
            {
              uri: image,
              type: imgMimeTypes[imgExt],
            },
          ],
        },
      })
    );
  }

  writeMetadataJson(metadata: Metadata[]) {
    fs.writeFileSync(
      `${buildDir}/metadata.json`,
      JSON.stringify(metadata.map((md) => this.mapMetadata(md)))
    );
  }

  getLayerDirNames(): string[] | undefined {
    try {
      return fs
        .readdirSync(layersDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch (error) {
      console.warn("No layers directory found. Please create one.");
      process.exitCode = 1;
    }
  }

  setupWorkspace() {
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/assets`);
  }
}
