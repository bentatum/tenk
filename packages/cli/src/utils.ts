import yargs from 'yargs';
import { cwd } from './env';
import { Config, Options } from './types';
import {
  getConfig as getEngineConfig
} from '@tenk/engine';

export const getArgv = (): Options => {
  return yargs(process.argv.slice(2)).options({
    verbose: { type: 'boolean', default: false },
  }).argv as Partial<Config>;
};

export const loadUserConfig = async (): Promise<Options> => {
  const argv = getArgv();
  const options = (await import(`${cwd}/tenk.config.js`)) as Options;
  return {
    ...options,
    ...argv,
  };
};

export const getConfig = async (): Promise<Config> => {
  const userConfig = await loadUserConfig();
  return {
    ...getEngineConfig(userConfig),
    renderHeight: userConfig.renderHeight || 2000,
    renderWidth: userConfig.renderWidth || 2000,
    renderImages:
      typeof userConfig.renderImages === 'undefined'
        ? true
        : userConfig.renderImages,
    renderTokenMetadataJson: Boolean(
      userConfig.renderTokenMetadataJson || false
    ),
    sourceType: userConfig.sourceType || 'svg',
    verbose: Boolean(userConfig.verbose || false),
    viewBox: userConfig.viewBox || '0 0 480 480',
  };
};
