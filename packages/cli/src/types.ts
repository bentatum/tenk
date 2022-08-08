import { Config as EngineConfig } from '@tenk/engine';

export interface Config extends EngineConfig {
  sourceType: 'png' | 'svg';
  renderHeight: number;
  renderImages: boolean;
  renderTokenMetadataJson: boolean;
  renderWidth: number;
  verbose: boolean;
  viewBox: string;
}

export type Options = Partial<Config>;
