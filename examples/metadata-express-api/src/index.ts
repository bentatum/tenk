import express from 'express';
import tenk from '@tenk/engine';

const app = express();
const port = 8080;

// export interface Config {
//   editions: EditionConfig[];
//   rarityDelimiter: string;
//   renderHeight: number;
//   renderImages: boolean;
//   renderTokenMetadataJson: boolean;
//   renderWidth: number;
//   sourceType: 'png' | 'svg';
//   startIndex: number;
//   tokenNamePrefix: string;
//   tokenUri: string;
//   tokenDescription: TokenDescription;
//   verbose: boolean;
//   viewBox: string;
// }

app.get('/', async (_req, res) => {
  const metadata = await tenk({
    editions: [
      {
        size: 1000,
        layers: [
          {
            name: 'Background',
            bypassDNA: true,
            elements: [
              { name: 'Blue' },
              { name: 'Green' },
              { name: 'Light blue' },
              { name: 'Orange' },
              { name: 'White' },
            ],
          },
          {
            name: 'Skin',
            elements: [{ name: 'Light' }, { name: 'Medium' }, { name: 'Dark' }],
          },
          {
            name: 'Hair',
            odds: 9 / 10,
            elements: [
              { name: 'Long' },
              { name: 'Short' },
              { name: 'Mohawk' },
              { name: 'Pony tail' },
            ],
          },
          {
            name: 'Eyes',
            elements: [{ name: 'Default' }, { name: 'Happy' }, { name: 'Sad' }],
          },
          {
            name: 'Shirt',
            odds: 9 / 10,
            elements: [
              { name: 'Red' },
              { name: 'Blue' },
              { name: 'Yellow' },
              { name: 'White' },
            ],
          },
          {
            name: 'Pants',
            odds: 9 / 10,
            elements: [
              { name: 'Blue' },
              { name: 'White' },
              { name: 'Black' },
              { name: 'Brown' },
            ],
          },
          {
            name: 'Shoes',
            odds: 3 / 5,
            elements: [
              { name: 'Sneakers' },
              { name: 'Boots' },
              { name: 'Sandals' },
            ],
          },
        ],
      },
    ],
  });
  res.json(metadata);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
