import { Attribute as EngineAttribute, LayerConfig } from "@tenk/engine";

export interface Factory {
  create(...args: any): any;
}

export interface Project {
  create(size: number): Promise<void>;
}

export interface LayerDirectory {
  create(name: string): void;
}

export interface LayerDirectoryMetadata {
  path: string;
  fileType: FileType;
}

export interface ElementFile {
  create(name: string): void;
}

export interface ElementFileMetadata {
  path: string;
  fileType: FileType;
  height: number;
  width: number;
  svgAttributes?: Record<string, string>;
}

export interface ElementFileConfig {
  path: string;
  metadata: Partial<ElementFileMetadata>;
}

export interface TenkConfig {
  layers?: Record<string, LayerConfig>;
}

export type FileType = "svg" | "png";

export interface Attribute extends EngineAttribute {
  metadata: ElementFileMetadata;
}
