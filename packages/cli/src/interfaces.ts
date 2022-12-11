import { Attribute as EngineAttribute, LayerConfig } from "@tenk/engine";

export interface Factory {
  create(...args: any): any;
}

export interface Collection {
  create(options: CollectionCreateOptions): Promise<void>;
}

export interface CollectionCreateOptions {
  size: number;
  formats?: string;
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
  layers?: Record<string, Partial<LayerConfig>>;
}

export enum FileType {
  SVG,
  PNG,
}

export interface Attribute extends EngineAttribute {
  metadata: ElementMetadata;
}
