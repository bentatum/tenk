import fs from "fs";
import path from "path";
import { layersDir } from "@/env";
import { Factory, FileType, LayerMetadata, TenkConfig } from "@/interfaces";
import { inject, injectable } from "inversify";
import { Element } from "../Element";
import { LayerConfig } from "@tenk/engine";

@injectable()
export class Layer implements Factory {
  odds: number;
  name: string;
  elements: Element[];
  mustAccompany?: Record<string, string[]>;
  cannotAccompany?: Record<string, string[]>;
  bypassDNA?: boolean;
  svgAttributes?: Record<string, string>;
  metadata: LayerMetadata = {
    fileType: FileType.PNG,
    path: "",
  };

  constructor(
    @inject("Config")
    public config: TenkConfig,
    @inject("Factory<Element>")
    public elementFactory: () => Element
  ) {}

  updateMetadata(data: Partial<LayerMetadata>) {
    this.metadata = { ...this.metadata, ...data };
  }

  applyConfig(config: Partial<LayerConfig>) {
    this.odds = config.odds || this.odds;
    this.mustAccompany = config.mustAccompany || this.mustAccompany;
    this.cannotAccompany = config.cannotAccompany || this.cannotAccompany;
    this.bypassDNA = config.bypassDNA || this.bypassDNA;
    this.svgAttributes = config.svgAttributes || this.svgAttributes;
  }

  create(folderName: string) {
    this.parseFileName(folderName);
    this.updateMetadata({
      path: `${layersDir}/${folderName}`,
    });
    if (this.config && this.config.layers) {
      const starConfig = this.config.layers["*"];
      if (starConfig) {
        this.applyConfig(starConfig);
      }
      const layerConfig = this.config.layers[this.name];
      if (layerConfig) {
        this.applyConfig(layerConfig);
      }
    }
    this.setElements();
    return this;
  }

  getLayerFiles(): string[] {
    return fs
      .readdirSync(this.metadata.path, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isFile() &&
          [".png", ".svg"].includes(path.extname(dirent.name))
      )
      .map((dirent) => dirent.name);
  }

  parseFileType(fileName: string) {
    switch (path.extname(fileName)) {
      case ".svg":
        return FileType.SVG;
      case ".png":
        return FileType.PNG;
      default:
        throw new Error(`Unknown file type: ${fileName}`);
    }
  }

  setElements(): void {
    const fileNames = this.getLayerFiles();
    // we don't support mixed file types in a collection, yet.
    // grab the first file and use it to determine the type.
    this.updateMetadata({
      fileType: this.parseFileType(fileNames[0]),
    });
    this.elements = fileNames.map((name) =>
      this.elementFactory().create({
        path: `${this.metadata.path}/${name}`,
        metadata: {
          svgAttributes: this.svgAttributes,
        },
      })
    );
  }

  parseFileName(folderName: string) {
    let odds = 1,
      name = folderName;
    // if the layer name starts with a number,
    // it's the order of the layer, let's remove it.
    if (name.match(/^([0-9]+_)/)) {
      name = name.replace(/^([0-9]+_)/, "");
    }
    // if the layer name ends with a number,
    // it's the weight of the layer, let's remove it.
    if (name.match(/(#[0-9]+)$/)) {
      odds = Number(name.split("#")[1]) / 100;
      name = name.replace(/(#[0-9]+)$/, "");
    }

    this.odds = odds;
    this.name = name;
  }

  getFileType(): FileType {
    return this.metadata.fileType;
  }
}
