import { cwd } from './env';
import { Config } from './types';
import crypto from 'crypto';
import yargs from 'yargs';

let config: Partial<Config>;

const loadConfig = async () => {
  const argv = getArgv();

  config =
    config || ((await import(`${cwd}/tenk.config.js`)) as Partial<Config>);

  return {
    ...config,
    ...argv,
  };
};

export const getConfig = async (): Promise<Config> => {
  const config = await loadConfig();

  // @todo use something like zod to validate config
  if (!config.editions || !config.editions.length) {
    console.log(
      "Oops, you're missing the required `editions` configuration in your tenk.config.js file."
    );
    throw new Error('Invalid configuration');
  }

  return {
    editions: config.editions || [],
    rarityDelimiter: config.rarityDelimiter || '#',
    renderHeight: config.renderHeight || 2000,
    renderImages:
      typeof config.renderImages === 'undefined' ? true : config.renderImages,
    renderTokenMetadataJson: Boolean(config.renderTokenMetadataJson || false),
    renderWidth: config.renderWidth || 2000,
    sourceType: config.sourceType || 'svg',
    startIndex: config.startIndex || 1,
    tokenDescription: config.tokenDescription || (() => ''),
    tokenNamePrefix: config.tokenNamePrefix || '',
    tokenUri: config.tokenUri || '',
    verbose: Boolean(config.verbose || false),
    viewBox: config.viewBox || '0 0 480 480',
  };
};

export const sha1 = (value: any): string => {
  const shasum = crypto.createHash('sha1');
  shasum.update(value);
  return shasum.digest('hex');
};

export const getArgv = (): Partial<Config> => {
  return yargs(process.argv.slice(2)).options({
    verbose: { type: 'boolean', default: false },
    metadataPath: { type: 'string' },
  }).argv;
};
