import fs from "fs";
import path from "path";
import { layersDir } from "@/env";
import {
  Factory,
  FileType,
  LayerDirectoryMetadata,
  TenkConfig,
} from "@/interfaces";
import { inject, injectable } from "inversify";
import { ElementFile } from "./ElementFile";
import { LayerConfig } from "@/../../engine/dist";

@injectable()
export class LayerDirectory implements Factory {
  odds: number;
  name: string;
  elements: ElementFile[];
  metadata: LayerDirectoryMetadata = {
    fileType: "png",
    path: "",
  };
  mustAccompany?: Record<string, string[]>;
  cannotAccompany?: Record<string, string[]>;
  bypassDNA?: boolean;
  svgAttributes?: Record<string, string>;

  constructor(
    @inject("Factory<ElementFile>")
    public elementFactory: () => ElementFile
  ) {}

  updateMetadata(data: Partial<LayerDirectoryMetadata>) {
    this.metadata = { ...this.metadata, ...data };
  }

  applyConfig(config: LayerConfig) {
    this.odds = config.odds;
    this.mustAccompany = config.mustAccompany;
    this.cannotAccompany = config.cannotAccompany;
    this.bypassDNA = config.bypassDNA;
    this.svgAttributes = config.svgAttributes;
  }

  create(name: string, config?: TenkConfig) {
    this.parseFileName(name);
    this.updateMetadata({
      path: `${layersDir}/${name}`,
    });
    if (config) {
      const starConfig = config.layers?.["*"];
      if (starConfig) {
        this.applyConfig(starConfig);
      }
      const layerConfig = config.layers?.[this.name.toLowerCase()];
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

  setElements(): void {
    const fileNames = this.getLayerFiles();
    // we don't support mixed file types in a collection, yet.
    // grab the first file and use it to determine the type.
    this.updateMetadata({
      fileType: path.extname(fileNames[0]).replace(".", "") as FileType,
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

  parseFileName(rawDirectoryName: string) {
    let odds = 1,
      name = rawDirectoryName;
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
