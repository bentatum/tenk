import { Attribute as EngineAttribute, LayerConfig } from "@tenk/engine";

export interface Factory {
  create(...args: any): any;
}

export interface LayerMetadata {
  path: string;
  fileType: FileType;
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
  size?: number;
  formats?: string;
  verbose?: boolean;
  layers?: Record<string, Partial<LayerConfig>>;
}

export enum FileType {
  SVG,
  PNG,
}

export interface Attribute extends EngineAttribute {
  metadata: ElementMetadata;
}
