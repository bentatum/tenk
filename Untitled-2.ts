import fs from "fs";
import { Attribute, Factory, FileType, TenkConfig } from "@/interfaces";
import { injectable, inject } from "inversify";
import { buildDir, configPath, layersDir } from "@/env";
import { Layer } from "../Layer";
import tenk, { Metadata } from "@tenk/engine";
import { SvgFile } from "../SvgFile";
import { PngFile } from "../PngFile";
import cliProgress from "cli-progress";

interface CreateOptions {
  size: number;
  formats?: string;
  verbose?: boolean;
}

@injectable()
export class Collection implements Factory {
  size: number;
  layers: Layer[];
  config?: TenkConfig;
  fileType: FileType;
  verbose: boolean;

  constructor(
    @inject("Factory<Layer>")
    public LayerFactory: () => Layer,
    @inject("SvgFile")
    public svgFile: SvgFile,
    @inject("PngFile")
    public pngFile: PngFile
  ) {}

  async createLayers() {
    if (this.verbose) {
      console.log("Creating layers...");
    }

    const folders = this.getLayerDirNames();

    if (!folders) {
      throw new Error('No folders found');
    }

    if (this.verbose) {
      console.log(folders);
    }

    this.layers = folders.map((name) =>
      this.LayerFactory().create(layersDir, name)
    );

    if (this.verbose) {
      console.log("Layers created", {
        layers: this.layers,
      });
    }
  }

  async create(options: CreateOptions) {
    this.verbose = Boolean(options.verbose);

    if (this.verbose) {
      console.log("Creating NFT collection...", { options });
    }

    this.setupWorkspace();
    this.setConfig();
    this.size = options.size;

    await this.createLayers();

    this.fileType = this.layers[0].getFileType();
    const metadata = tenk(this.layers, {
      size: this.size,
    });

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

    const formats = options.formats;

    if (!formats || formats.includes("png")) {
      this.pngFile.setupCanvas(
        metadata[0].attributes[0].metadata.height,
        metadata[0].attributes[0].metadata.width
      );
    }

    for (let i = 0; i < metadata.length; i++) {
      if (this.fileType === FileType.SVG) {
        // if file type is svg, create an svg first
        // so we can apply top level user defined attributes
        const svgPath = `${buildDir}/svg/${i}.svg`;
        const pngPath = `${buildDir}/png/${i}.png`;
        const attributes = metadata[i].attributes as Attribute[];
        this.svgFile.create(attributes, svgPath);
        if (!formats || formats.includes("png")) {
          await this.pngFile.create(attributes, pngPath, svgPath);
        }
      } else if (this.fileType === FileType.PNG) {
        if (formats && formats.includes("svg")) {
          const warning =
            "Your layers are png files. SVG files cannot not be generated.";
          console.warn(warning);
          process.exitCode = 1;
          return;
        }
        const pngPath = `${buildDir}/png/${i}.png`;
        const attributes = metadata[i].attributes as Attribute[];
        await this.pngFile.create(attributes, pngPath);
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
      JSON.stringify(metadata.map((md) => this.mapMetadata(md)))
    );
  }

  getLayerDirNames(): string[] {
    try {
      return fs
        .readdirSync(layersDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch (error) {
      console.warn("Failed to get layers from layer directory", { error });
      process.exitCode = 1;
    }
  }

  setConfig() {
    if (this.verbose) {
      console.log(`Checking for config file at ${configPath}`);
    }
    if (fs.existsSync(configPath)) {
      if (this.verbose) {
        console.log("Loading config file...");
      }
      this.config = require(configPath);
      if (this.verbose) {
        console.log("Config file loaded", { config: this.config });
      }
    }
  }

  setupWorkspace() {
    if (fs.existsSync(buildDir)) {
      if (this.verbose) {
        console.log("Cleaning up existing .tenk folder");
      }
      fs.rmSync(buildDir, { recursive: true });
      if (this.verbose) {
        console.log("Stale .tenk folder removed");
      }
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/png`);
    fs.mkdirSync(`${buildDir}/svg`);
    if (this.verbose) {
      console.log("Created .tenk folder");
    }
  }
}
