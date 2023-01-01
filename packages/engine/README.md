# @tenk/engine

A recursive stacking algorithm that can be used in the browser / a backend service to produce only the metadata for your project.

## Install

```
npm i @tenk/engine
```

## Usage

```js
import tenk from "@tenk/engine";

const metadata = tenk([
  {
    name: "Background",
    elements: [
      { name: "Red" },
      { name: "Blue" },
      { name: "Rare", weight: 0.1 }
    ],
    attribute: (layer) => ({
      trait_type: 'Bg',
      value: layer.selectedElement.name
    })
  },
  {
    name: "Body",
    elements: [
      { name: "Big" },
      { name: "Medium" },
      { name: "Small" },
    ]
  },
  {
    name: "Hair",
    elements: [
      { name: "Long" },
      { name: "Medium" },
      { name: "Short" },
    ]
  }
]);
/*
 [
   { 
     "name": "1",
      "attributes": [
        { "trait_type": "Bg", "value": "Red" },
        { "trait_type": "Body", "value": "Medium" },
        { "trait_type": "Hair", "value": "Short" }
      ]
    },
    ... other tokens
  ]
*/
```

## Layer
---
- `name`
- `elements`
- `attribute`

### `name`
The layer name

### `elements`
A list of elements 

### `attribute(layer: Layer, tokenLayers: Layer[], dna: string): Attribute | null;`
Use this function to customize a layer's attribute.
```js
tenk([
  {
    name: "Headwear_Baseball Cap",
    attribute: (layer, _tokenLayers, dna) => ({
      trait_type: 'Baseball Cap',
      value: layer.selectedElement.name,
      dna
    })
  },
])
```

If you need to omit a layer's attribute you can return null.
```js
tenk([
  {
    name: "Character Outline",
    attribute: (layer) => null
  },
])
```

## Options
---
- `brokenRuleThreshold`
- `duplicateThreshold`
- `size`
- `modifyLayers`
- `modifyMetadata`

### `brokenRuleThreshold: number`
If you have rules set on your layers like `cannotAccompany` or `mustAccompany` this is the amount of times the collection algorithm is allowed to break those rules before it exits.

### `duplicateThreshold: number`
If the collection algorithm creates more than this amount of duplicate tokens, it will exit.

### `size: number`
This is the size limit of the collection. Defaults is 10,000.

### `modifyLayers(tokenLayers: Layer[], tokenId: number, allLayers: Layer[]): Layer[]`
This is a function that you can define that will allow you to alter the chosen layers for any specific token. For example:

```js
tenk(layers, {
  modifyLayers(tokenLayers, tokenId, allLayers) {
    const specialBgIdx = tokenLayers.findIndex(layer => layer.name === 'Special Background')
    if (specialBgIdx > -1) {
      const specialElement = allLayers.find(layer => layer.name === "Special Element")
      tokenLayers.splice(specialElement, 0, specialElement);
    }
    return tokenLayers;
  }
})
```

### `modifyMetadata(tokenId: number, attributes: Attribute[], tokenLayers: Layer[], dna: string): Metadata`
This function will allow you to modify each token's metadata. For example:

```js
tenk(layers, {
  modifyMetadata(tokenId, attributes, tokenLayers, dna) {
    return {
      name: `Tank #${tokenId}`,
      description: someGeneratedDescription(tokenId, dna)
    }
  }
})
```

