# @tenk/engine

A recursive stacking algorithm that can be used in the browser / a backend service to produce only the metadata for your project.

## Install

```
npm i @tenk/engine
```

## Usage

```js
import tenk from "@tenk/engine";

const layers = [
  {
    name: "Background",
    elements: [
      {
        name: "Red",
      },
      {
        name: "Blue",
      },
    ],
  },
  {
    name: "Skin",
    elements: [
      {
        name: "Light",
      },
      {
        name: "Medium",
      },
      {
        name: "Dark",
      },
    ],
  },
  {
    name: "Hair",
    elements: [
      {
        name: "Short",
      },
      {
        name: "Long",
      },
    ],
  },
  {
    name: "Eyes",
    elements: [
      {
        name: "Brown",
      },
      {
        name: "Blue",
      },
    ],
  },
];

const metadata = tenk(layers);

console.log({ metadata });
```
