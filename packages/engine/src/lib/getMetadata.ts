import crypto from 'crypto';
import { Config, Metadata, TokenAttribute } from '../types';

const sha1 = (value: any): string => {
  const shasum = crypto.createHash('sha1');
  shasum.update(value);
  return shasum.digest('hex');
};

const getMetadata = (
  config: Config,
  dna: string,
  edition: number,
  attributes: TokenAttribute[],
  editionAttributes: TokenAttribute[] = []
): Metadata => {
  const metadata: Metadata = {
    name: `${config.tokenNamePrefix}#${edition}`,
    image: `${config.tokenUri}/${edition}.png`,
    dna: sha1(dna),
    edition,
    date: Date.now(),
    attributes: [...attributes, ...editionAttributes],
  };

  if (config.tokenDescription) {
    metadata.description = config.tokenDescription(
      dna,
      edition,
      attributes,
      editionAttributes
    );
  }

  return metadata;
};

export default getMetadata;
