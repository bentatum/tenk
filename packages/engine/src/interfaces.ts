export interface Factory {
  create(...args: any): any;
}

export interface ElementConfig {
  name: string;
  weight?: number;
  layers?: LayerConfig[];
  cannotAccompany?: string[];
  mustAccompany?: string[];
  metadata?: Record<string, any>;
}

export interface LayerConfig {
  name: string;
  elements: ElementConfig[];
  odds?: number;
  bypassDNA?: boolean;
  mustAccompany?: Record<string, string[]>;
  cannotAccompany?: Record<string, string[]>;
  svgAttributes?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface Options {
  size?: number;
  duplicateThreshold?: number;
  brokenRuleThreshold?: number;
}

export interface Collection {
  create(layerConfigurations: LayerConfig[], options: Options): Metadata[];
}

export interface Metadata {
  name: string;
  description?: string;
  dna: string;
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: string;
  metadata?: Record<string, any>;
}

export type RuleTypes = "mustAccompany" | "cannotAccompany";