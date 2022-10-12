import { Layer } from "@/entities/Layer";

const cannotAccompanyFilter = (
  layer: Layer,
  _index: number,
  selectedLayers: Layer[]
) => {
  const layerRules = layer.cannotAccompany;
  const elementRules = layer.selectedElement?.cannotAccompany;

  if (!layerRules && !elementRules) return true;

  let restrictedMatches: string[] = [];

  if (elementRules) {
    restrictedMatches = restrictedMatches.concat(elementRules);
  } else if (layerRules) {
    restrictedMatches = Object.keys(layerRules)
      .filter((key) => {
        if (key.startsWith("/") && key.endsWith("/")) {
          return Boolean(
            layer.selectedElement?.name.match(
              new RegExp(key.replace(/\//g, ""), "g")
            )
          );
        }
        return (
          key === "*" ||
          key === layer.selectedElement?.name ||
          key === `${layer.name}.${layer.selectedElement?.name}`
        );
      })
      .map((key) => layerRules[key])
      .flat();
  }

  return !selectedLayers.some((sl) =>
    restrictedMatches.find((el) => {
      const [restrictedLayerName, restrictedElementName] = el.split(".") as [
        string,
        string | undefined
      ];

      const regexQuery =
        restrictedElementName?.startsWith("/") &&
        restrictedElementName?.endsWith("/") &&
        restrictedElementName?.replace(/\//g, "");

      if (regexQuery) {
        return Boolean(
          sl.selectedElement?.name.match(new RegExp(regexQuery, "gi"))
        );
      }

      return restrictedLayerName === sl?.name;
    })
  );
};

export default cannotAccompanyFilter;
