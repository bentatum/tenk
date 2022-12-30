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
      { name: "Red" },
      { name: "Blue" },
    ],
  },
  // ... other layers
];

const metadata = tenk(layers);
/*
 [
   { 
     "name": "1",
      "attributes": [
        { "trait_type": "Background", "value": "Red" },
        { "trait_type": "Body", "value": "Normal" },
        { "trait_type": "Hair", "value": "Medium" }
      ]
    },
    ... other tokens
  ]
*/
```

## Options
- `brokenRuleThreshold`
- `duplicateThreshold`
- `size`
- `modifier`

### `brokenRuleThreshold: number`
If you have rules set on your layers like `cannotAccompany` or `mustAccompany` this is the amount of times the collection algorithm is allowed to break those rules before it exits.

### `duplicateThreshold: number`
If the collection algorithm creates more than this amount of duplicate tokens, it will exit.

### `size: number`
This is the size limit of the collection. Defaults is 10,000.

### `modifier(tokenLayers: Layer[], tokenId: number, allLayers: Layer[]): Layer[]`
This is a function that you can define that will allow you to alter the chosen layers for any specific token. For example:

```js
tenk(layers, {
  modifier(tokenLayers, tokenId, allLayers) {
    const specialBgIdx = tokenLayers.findIndex(layer => layer.name === 'Special Background')
    if (specialBgIdx > -1) {
      const specialElement = allLayers.find(layer => layer.name === "Special Element")
      tokenLayers.splice(specialElement, 0, specialElement);
    }
  }
})
```


