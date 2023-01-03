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

export type ParentLayer = Pick<LayerConfig, "name" | "parentLayer">;

export interface TenkJsonLayerConfig
  extends Omit<LayerConfig, "name" | "layers" | "elements"> {
    name?: string;
  layers?: TenkJsonLayerConfig[];
  elements?: Record<string, ElementConfig>;
}

export interface TenkJsonConfig {
  name?: string;
  image?: string;
  symbol?: string;
  description?: string;
  size?: number;
  formats?: string;
  verbose?: boolean;
  layers?: Record<string, TenkJsonLayerConfig>;
}

export enum FileType {
  SVG,
  PNG,
}

export interface Attribute extends EngineAttribute {
  metadata: ElementMetadata;
}
