import { Layer } from '../types';

const createDna = (layers: Layer[]): string => {
  return layers.reduce((acc, { selectedElement, bypassDNA }, index) => {
    acc += !bypassDNA
      ? `${index > 0 ? '-' : ''}${selectedElement?.id}:${
          selectedElement?.filename
        }`
      : '';
    return acc;
  }, '');
};

export default createDna;
