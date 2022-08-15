import yargs from 'yargs';
import { attributesDir, cwd } from './env';
import { Config, Options } from './types';
import { getConfig as getEngineConfig, LayerElement } from '@tenk/engine';
import fs from 'fs';

export const getArgv = (): Options => {
  return yargs(process.argv.slice(2)).options({
    verbose: { type: 'boolean', default: false },
  }).argv as Partial<Config>;
};

export const getAttributeElements = (attributeName: string): LayerElement[] => {
  return fs.readdirSync(`${attributesDir}/${attributeName}`).map(name => ({
    name,
    weight: undefined, // @todo: parse by rarity delimiter
  }));
};

export const loadUserConfig = async (): Promise<Options> => {
  const argv = getArgv();
  let options = (await import(
    `${cwd}/tenk.config.js`
  ).catch(() => {})) as Options;
  if (!options && fs.existsSync(attributesDir)) {
    const attributes = fs.readdirSync(attributesDir);
    options = {
      editions: [
        {
          size: 100,
          layers: attributes.map(name => ({
            name,
            elements: getAttributeElements(name),
          })),
        },
      ],
    };
  }
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
