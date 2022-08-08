import { Config, Options } from './types';

export const getConfig = (options: Options): Config => ({
  editions: options.editions || [],
  rarityDelimiter: options.rarityDelimiter || '#',
  startIndex: options.startIndex || 0,
  tokenDescription: options.tokenDescription || (() => ''),
  tokenNamePrefix: options.tokenNamePrefix || '',
  tokenUri: options.tokenUri || '',
});
