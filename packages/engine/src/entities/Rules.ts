import { RuleTypes } from "@/interfaces";
import { injectable } from "inversify";
import { Layer } from "./Layer";

@injectable()
export class Rules {
  parseRule(rules: string): string[] {
    return rules
      .toLowerCase()
      .split(".")
      .map((rule) => rule.trim())
      .filter((rule) => rule);
  }

  match(rule: string, comparator: Layer) {
    const layerName = comparator.name.toLowerCase();
    const elementName = comparator.selectedElement?.name.toLowerCase();
    const rules = this.parseRule(rule);
    const layerMatch = rules[0] === layerName;

    if (!layerMatch) return false;

    const elementNameRule = rules[1];

    if (
      elementNameRule &&
      elementNameRule.startsWith("/") &&
      elementNameRule.endsWith("/")
    ) {
      return Boolean(
        elementName.match(new RegExp(elementNameRule.replace(/\//gi, ""), "gi"))
      );
    }

    if (layerMatch && elementNameRule) {
      return elementNameRule === elementName;
    }

    return layerMatch;
  }

  getRulesFromLayer(layer: Layer, rule: RuleTypes) {
    const layerRules = layer[rule];
    const elementRules = layer.selectedElement?.[rule];

    if (!layerRules && !elementRules) return [];

    let rules: string[] = [];

    if (elementRules) {
      rules = rules.concat(elementRules);
    } else if (layerRules) {
      rules = Object.keys(layerRules)
        .filter((key) => {
          // const layerName = layer.name.toLowerCase();
          const elementName = layer.selectedElement?.name.toLowerCase();
          if (key.startsWith("/") && key.endsWith("/")) {
            return Boolean(
              elementName.match(new RegExp(key.replace(/\//g, ""), "gi"))
            );
          }
          const _key = key.toLowerCase();
          return (
            _key === "*" || _key === elementName
            // _key === `${layerName}.${elementName}`
          );
        })
        .map((key) => layerRules[key])
        .flat();
    }

    return rules;
  }

  cannotAccompany(layer: Layer, selectedLayers: Layer[]) {
    const rules = this.getRulesFromLayer(layer, "cannotAccompany");
    return !selectedLayers.some((selectedLayer) =>
      rules.find((rule) => this.match(rule, selectedLayer))
    );
  }

  mustAccompany(layer: Layer, selectedLayers: Layer[]) {
    const rules = this.getRulesFromLayer(layer, "mustAccompany");
    return rules.every((rule) => {
      const rules = this.parseRule(rule) as [string, string | undefined];
      const requiredLayer = selectedLayers.find(
        (x) => x.name.toLowerCase() === rules[0]
      );
      if (!requiredLayer) return true;
      return this.match(rule, requiredLayer);
    });
  }
}