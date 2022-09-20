import { Layer } from"../layer";

const mustAccompanyFilter = (
  layer: Layer,
  _index: number,
  selectedLayers: Layer[]
) => {
  const layerRules = layer.mustAccompany;
  const elementRules = layer.selectedElement?.mustAccompany;

  if (!layerRules && !elementRules) return true;

  let requiredElements: string[] = [];

  if (elementRules) {
    requiredElements = requiredElements.concat(elementRules);
  } else if (layerRules) {
    // get this layer's required elements
    requiredElements = Object.keys(layerRules)
      .filter((key) => {
        // @todo: this is a function
        if (key.startsWith("/") && key.endsWith("/")) {
          return Boolean(
            layer.selectedElement?.name.match(
              new RegExp(key.replace(/\//g, ""), "g")
            )
          );
        }
        // @todo: this is a function
        return (
          key === "*" ||
          `${layer.name}.${key}` ===
            `${layer.name}.${layer.selectedElement?.name}`
        );
      })
      .map((key) => layerRules[key])
      .flat();
  }

  if (!requiredElements.length) {
    return true;
  }

  const hasRequiredElements = requiredElements.some((requiredElement) => {
    const [requiredLayerName, requiredElementName] = requiredElement.split(
      "."
    ) as [string, string | undefined];

    const requiredLayer = selectedLayers.find(
      (x) => x.name === requiredLayerName
    );

    if (!requiredLayer) {
      return false;
    }

    if (!requiredElementName) {
      return true;
    }

    const regexQuery =
      requiredElementName?.startsWith("/") &&
      requiredElementName?.endsWith("/") &&
      requiredElementName?.replace(/\//g, "");

    if (regexQuery) {
      return Boolean(
        requiredLayer?.selectedElement?.name.match(new RegExp(regexQuery, "g"))
      );
    }

    return requiredElementName === requiredLayer.selectedElement?.name;
  });

  return hasRequiredElements;
};

export default mustAccompanyFilter;
