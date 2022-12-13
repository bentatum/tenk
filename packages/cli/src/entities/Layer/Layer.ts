import fs from "fs";
import path from "path";
import { layersDir } from "@/env";
import {
  ElementConfig,
  Factory,
  FileType,
  LayerMetadata,
  TenkLayerConfig,
} from "@/interfaces";
import { inject, injectable } from "inversify";
import { Element } from "../Element";
import { Config } from "../Config";

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
    @inject("Logger")
    public logger: any,
    @inject("Config")
    public config: Config,
    @inject("Factory<Element>")
    public elementFactory: () => Element
  ) {}

  updateMetadata(data: Partial<LayerMetadata>) {
    this.metadata = { ...this.metadata, ...data };
  }

  applyConfig() {
    const layerConfig = this.getLayerConfig();
    if (layerConfig) {
      this.odds = layerConfig.odds || this.odds;
      this.mustAccompany = layerConfig.mustAccompany || this.mustAccompany;
      this.cannotAccompany =
        layerConfig.cannotAccompany || this.cannotAccompany;
      this.bypassDNA = layerConfig.bypassDNA || this.bypassDNA;
      this.svgAttributes = layerConfig.svgAttributes || this.svgAttributes;
    }
  }

  getLayerConfig(): TenkLayerConfig | undefined {
    const layersConfig = this.config.get("layers");
    if (layersConfig) {
      return {
        ...layersConfig["*"],
        ...layersConfig[this.name],
      };
    }
  }

  create(folderName: string) {
    this.parseFolderName(folderName);
    this.updateMetadata({
      path: `${layersDir}/${folderName}`,
    });

    this.applyConfig();
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

    const layerConfig = this.getLayerConfig();

    this.elements = fileNames.map((fileName) => {
      const elementName = fileName.replace(path.extname(fileName), "");
      const elementConfig = layerConfig?.elements?.[elementName];
      this.logger.verbose(
        "Creating element...",
        elementName,
        elementConfig ? elementConfig : "[no config found]"
      );
      return this.elementFactory().create({
        ...elementConfig,
        path: `${this.metadata.path}/${fileName}`,
        metadata: {
          ...elementConfig?.metadata,
          svgAttributes: this.svgAttributes,
        },
      });
    });
  }

  parseFolderName(folderName: string) {
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

    this.logger.verbose("Parsing folder name...");

    this.logger.verbose(
      `Layer directory name: ${folderName}`,
      `Layer name: ${name}`,
      `Layer odds: ${odds}`
    );

    this.odds = odds;
    this.name = name;
  }

  getFileType(): FileType {
    return this.metadata.fileType;
  }
}
