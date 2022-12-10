![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat)

# TENK

The generative art framework

![npx tenk 10000 svg](/examples/demo.svg)

## Get Started

Create a directory with a folder called `layers`. Each layer should be a folder with image files. It should look something like this:

```
my-generative-art-project/
  layers/
    01_Background
    02_Body
    03_Eyes
    04_Hair
```

Ok, now run `npx tenk` in your project folder. Once completed, all of your generated files are rendered to the `.tenk` folder.

### Layer Ordering

Since layers are stacked in alphabetical order, you can configure the order in which they're stacked by prefixing them with a number and an underscore.

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

### Child Layers

Sometimes we layers that come in different colors or patterns. We make it simple to configure
