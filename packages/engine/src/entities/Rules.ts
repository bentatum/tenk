import { RuleTypes } from "@/interfaces";
import { injectable } from "inversify";
import { Layer } from "./Layer";

@injectable()
export class Rules {
  parseRule(rules: string): string[] {
    const splitRules = rules.split(".");
    const elementName = splitRules.pop();
    const layerName = splitRules.join(".");
    return [layerName, elementName].filter(Boolean);
  }

  match(rule: string, comparator: Layer) {
    const layerName = comparator.name;
    const elementName = comparator.selectedElement?.name;
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
        elementName.match(new RegExp(elementNameRule.replace(/\//gi, ""), "g"))
      );
    }

    if (layerMatch && elementNameRule) {
      return elementNameRule === elementName;
    }

    return layerMatch;
  }

  getRulesFromLayer(layer: Layer, rule: RuleTypes): string[] {
    const layerRules = layer[rule];
    const elementRules = layer.selectedElement?.[rule];

    if (!layerRules && !elementRules) return [];

    let rules: string[] = [];

    if (elementRules) {
      rules = rules.concat(elementRules);
    } else if (layerRules) {
      rules = Object.keys(layerRules)
        .filter((key) => {
          const elementName = layer.selectedElement?.name;
          if (key.startsWith("/") && key.endsWith("/")) {
            return Boolean(
              elementName.match(new RegExp(key.replace(/\//gi, ""), "g"))
            );
          }
          return key === "*" || key === elementName;
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
      const rules = this.parseRule(rule);
      const requiredLayer = selectedLayers.find((x) => x.name === rules[0]);
      if (!requiredLayer) return true;
      return this.match(rule, requiredLayer);
    });
  }
}
