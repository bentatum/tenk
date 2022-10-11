import { Layer } from "@/Layer";

const mustAccompanyFilter = (
  layer: Layer,
  _index: number,
  selectedLayers: Layer[]
) => {
  if (!layer.selectedElement) return true;

  const layerRules = layer.mustAccompany;
  const elementRules = layer.selectedElement.mustAccompany;

  if (!layerRules && !elementRules) return true;

  let requiredElements: string[] = [];

  if (elementRules) {
    requiredElements = requiredElements.concat(elementRules);
  } else if (layerRules) {
    // get this layer's required elements
    requiredElements = Object.keys(layerRules)
      .filter((key) => {
        if (key.startsWith("/") && key.endsWith("/")) {
          return Boolean(
            layer.selectedElement!.name.match(
              new RegExp(key.replace(/\//g, ""), "gi")
            )
          );
        }
        return (
          key === "*" ||
          `${layer.name}.${key}` ===
            `${layer.name}.${layer.selectedElement!.name}`
        );
      })
      .map((key) => layerRules[key])
      .flat();
  }

  if (!requiredElements.length) {
    return true;
  }

  return requiredElements.every((requiredElement) => {
    const [requiredLayerName, requiredElementName] = requiredElement.split(
      "."
    ) as [string, string | undefined];

    const requiredLayer = selectedLayers.find(
      (x) =>
        x.name.toLocaleLowerCase() === requiredLayerName.toLocaleLowerCase()
    );

    if (!requiredLayer || !requiredLayer.selectedElement) {
      return false;
    }

    if (!requiredElementName) {
      return true;
    }

    const regexQuery =
      requiredElementName.startsWith("/") &&
      requiredElementName.endsWith("/") &&
      requiredElementName.replace(/\//g, "");

    if (regexQuery) {
      return Boolean(
        requiredLayer.selectedElement.name.match(new RegExp(regexQuery, "gi"))
      );
    }

    return (
      requiredElementName.toLocaleLowerCase() ===
      requiredLayer.selectedElement.name.toLocaleLowerCase()
    );
  });
};

export default mustAccompanyFilter;
