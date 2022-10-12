import { Attribute as EngineAttribute, LayerConfig } from "@tenk/engine";

export interface Factory {
  create(...args: any): any;
}

export interface Collection {
  create(size: number): Promise<void>;
}

export interface Layer {
  create(name: string): void;
}

export interface LayerMetadata {
  path: string;
  fileType: FileType;
}

export interface Element {
  create(name: string): void;
}

export interface ElementMetadata {
  path: string;
  fileType: FileType;
  height: number;
  width: number;
  svgAttributes?: Record<string, string>;
}

export interface ElementConfig {
  path: string;
  metadata: Partial<ElementMetadata>;
}

export interface TenkConfig {
  layers?: Record<string, LayerConfig>;
}

export type FileType = "svg" | "png";

export interface Attribute extends EngineAttribute {
  metadata: ElementMetadata;
}
