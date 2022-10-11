import fs from "fs";
import { Attribute, Factory, TenkConfig } from "@/interfaces";
import { injectable, inject } from "inversify";
import { buildDir, cwd, layersDir } from "@/env";
import { LayerDirectory } from "./LayerDirectory";
import tenk from "@tenk/engine";
import { SvgFile } from "./SvgFile";
import { PngFile } from "./PngFile";

@injectable()
export class Project implements Factory {
  size: number;
  layerDirectories: LayerDirectory[];
  config?: TenkConfig;
  //   metadata: Metadata;

  constructor(
    @inject("Factory<LayerDirectory>")
    public layerDirectoryFactory: () => LayerDirectory,
    @inject("SvgFile")
    public svgFile: SvgFile,
    @inject("PngFile")
    public pngFile: PngFile
  ) {}

  async create(size: number) {
    this.setConfig();
    this.size = size;
    const folders = this.getLayerDirNames();
    this.layerDirectories = folders.map((name) =>
      this.layerDirectoryFactory().create(name, this.config)
    );
    const fileType = this.layerDirectories[0].getFileType();
    const metadata = tenk(this.layerDirectories, {
      size: this.size,
    });

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
      //   progressBar.increment();
      //   progressBar.update(i + 1);
    }
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
}
