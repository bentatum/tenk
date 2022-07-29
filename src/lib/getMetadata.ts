import { Config, Metadata, TokenAttribute } from '../types';
import { sha1 } from '../utils';

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
