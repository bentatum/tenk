import crypto from 'crypto';
import {  Metadata, TokenAttribute } from '../types';

const sha1 = (value: any): string => {
  const shasum = crypto.createHash('sha1');
  shasum.update(value);
  return shasum.digest('hex');
};

const getMetadata = (
  dna: string,
  tokenId: number,
  attributes: TokenAttribute[],
  editionAttributes: TokenAttribute[] = []
): Metadata => {
  const metadata: Metadata = {
    name: String(tokenId),
    dna: sha1(dna),
    edition: tokenId,
    date: Date.now(),
    attributes: [...attributes, ...editionAttributes],
  };
  return metadata;
};

export default getMetadata;
