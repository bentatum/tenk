![Statements](https://img.shields.io/badge/statements-95.75%25-brightgreen.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-96.36%25-brightgreen.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-93.61%25-brightgreen.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-95.83%25-brightgreen.svg?style=flat)

# tenk

Generative art projects made simple.

## Get Started

Create a directory with a folder called `layers`. Each layer needs to be a folder with image files.

`cd` to your project folder in your terminal and type `npx tenk`. Images are rendered to the `.tenk` folder next to `layers`.

### Layer Ordering

Since layers are stacked in alphabetical order, you can control the order in which they appear by prefixing them with a number and an underscore. If `tenk` sees a number with an underscore as the first characters in your layer's directory name, it will remove it for you in the generated metadata.

```
layers/
  01_Background
  02_Body
  03_Eyes
  04_Hair
```

### Rarity

Layers have a property called `odds` that determines the likelyhood that it will be rendered or not. A lower number means rare, a higher number means common. You can define a layer's odds of appearing by appending a `#{percent value}` to the end of your file. If nothing is defined, it will always render.

For example, in the following directory structure Hair will appear 85% of the time and Jewlery will only appear 10% of the time.

```
layers/
  01_Background
  02_Body
  03_Eyes
  04_Hair#85
  05_Jewlery#10
```
