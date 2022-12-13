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
  weight?: number;
}

export interface TenkLayerConfig {
  layers?: LayerConfig[];
  odds?: number;
  bypassDNA?: boolean;
  mustAccompany?: Record<string, string[]>;
  cannotAccompany?: Record<string, string[]>;
  svgAttributes?: Record<string, any>;
  metadata?: Record<string, any>;
  elements?: Record<string, Partial<ElementConfig>>;
}

export interface TenkConfig {
  size?: number;
  formats?: string;
  verbose?: boolean;
  layers?: Record<string, TenkLayerConfig>;
}

export enum FileType {
  SVG,
  PNG,
}

export interface Attribute extends EngineAttribute {
  metadata: ElementMetadata;
}
