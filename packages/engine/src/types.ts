export interface LayerElementConfig {
  name: string;
  weight?: number;
  layers?: LayerConfig[];
  cannotAccompany?: string[];
  mustAccompany?: string[];
  imgHeight?: number;
  imgWidth?: number;
  imgPath?: string;
}
export interface LayerConfig {
  name: string;
  elements: LayerElementConfig[];
  odds?: number;
  bypassDNA?: boolean;
  cannotAccompany?: Record<string, string[]>;
  mustAccompany?: Record<string, string[]>;
}

export interface Attribute {
  trait_type: string;
  value: string;
  _imgHeight?: number;
  _imgWidth?: number;
  _imgPath?: string;
}

export interface Metadata {
  name: string;
  description?: string;
  dna: string;
  attributes: Attribute[];
}

export interface CollectionConfig {
  size?: number;
  duplicateThreshold?: number;
}
