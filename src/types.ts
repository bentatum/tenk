import { Image } from "canvas";

export interface EditionLayerOptions {}

export interface Metadata {
  name: string;
  description?: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  attributes: TokenAttribute[];
}

export interface Layer {
  name: string;
  displayName?: string;
  bypassDNA?: boolean;
  odds?: number;
  indexed?: boolean;
  cannotAccompany?: Record<string, string[]>;
  canOnlyAccompany?: Record<string, string[]>;
  mapAttributes?(
    layer: Layer,
    index: number,
    allLayers: Layer[]
  ): TokenAttribute[];
  metaDataIgnore?: boolean;
  htmlAttributes?: Record<string, string>;
  only?: string[];
  id?: number;
  elements?: LayerElement[];
  selectedElement?: LayerElement;
  groupWith?: string[];
}

export interface LayerElement {
  id: number;
  name: string;
  filename: string;
  ext: string;
  path: string;
  weight: number;
  loadedImage?: Image;
}

export interface EditionConfig {
  size: number;
  layers: Layer[];
  attributes?: TokenAttribute[];
}

export interface TokenAttribute {
  display_type?: string;
  trait_type?: string;
  value: string | number | boolean;
}

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  attributes: TokenAttribute[];
}

export type TokenDescription = (
  dna: string,
  edition: number,
  attributes: TokenAttribute[],
  editionAttributes: TokenAttribute[]
) => string;

export interface Config {
  editions: EditionConfig[];
  rarityDelimiter: string;
  renderHeight: number;
  renderImages: boolean;
  renderTokenMetadataJson: boolean;
  renderWidth: number;
  sourceType: 'png' | 'svg';
  startIndex: number;
  tokenNamePrefix: string;
  tokenUri: string;
  tokenDescription: TokenDescription;
  verbose: boolean;
  viewBox: string;
}

export type UserConfig = Partial<Config>;

export interface Argv {
  verbose?: boolean;
  metadataPath?: string;
  renderSvg?: boolean;
}
