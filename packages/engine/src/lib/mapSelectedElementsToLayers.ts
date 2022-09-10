import { Layer } from '../types';

const filterByOdds = (layer: Layer): boolean => {
  const odds = typeof layer.odds === 'undefined' ? 0.5 : layer.odds;
  return Math.random() < odds;
};

const selectElement = (layer: Layer, tokenId: number): Layer => {
  if (layer.indexed) {
    const selectedElement = layer.elements?.find(
      ({ name }) => Number(name) === tokenId
    );
    return {
      ...layer,
      selectedElement,
    };
  }

  // Don't select an element if it's only included with x,
  // because we go and include it later on.
  if (layer.groupWith && Object.keys(layer.groupWith).length) {
    return layer;
  }

  const elements = (
    (layer.only
      ? layer.elements?.filter(({ name }) => layer.only?.includes(name))
      : layer.elements) || []
  ).filter(element => (element.weight || 0) > 0);

  let totalWeight = 0;

  elements.forEach(element => {
    totalWeight += element.weight || 0;
  });

  // number between 0 - totalWeight
  let random = Math.random() * totalWeight;
  for (var i = 0; i < elements.length; i++) {
    // subtract the current weight from the random weight until we reach a sub zero value.
    random -= elements[i].weight || 0;
    if (random < 0 && elements[i]) {
      return {
        ...layer,
        selectedElement: elements[i],
      };
    }
  }
  return layer;
};

const mapSelectedElementsToLayers = (
  layers: Layer[],
  tokenId: number
): [Layer[], Layer[]] => {
  // pseudo randomly pick layers and
  // select the element for each
  let renderableLayers = layers
    .filter(filterByOdds)
    .map(layer => selectElement(layer, tokenId))
    .filter((layer, _index, selectedLayers) => {
      if (!layer.selectedElement) {
        return false;
      }

      if (layer?.cannotAccompany) {
        const rules = layer.cannotAccompany;
        const restrictedMatches = Object.keys(rules)
          .filter(key => {
            if (key.startsWith('/') && key.endsWith('/')) {
              return Boolean(
                layer.selectedElement?.name.match(
                  new RegExp(key.replace(/\//g, ''), 'g')
                )
              );
            }
            return (
              key === '*' ||
              key === layer.selectedElement?.name ||
              key === `${layer.name}.${layer.selectedElement?.name}`
            );
          })
          .map(key => rules[key])
          .flat();

        if (
          selectedLayers.some(sl => {
            return restrictedMatches.find(restrictedElement => {
              const [
                restrictedLayerName,
                restrictedElementName,
              ] = restrictedElement.split('.') as [string, string | undefined];

              const regexQuery =
                restrictedElementName?.startsWith('/') &&
                restrictedElementName?.endsWith('/') &&
                restrictedElementName?.replace(/\//g, '');

              if (regexQuery) {
                return Boolean(
                  sl.selectedElement?.name.match(new RegExp(regexQuery, 'g'))
                );
              }

              return restrictedLayerName === sl?.name;
            });
          })
        ) {
          return false;
        }
      }
      return true;
    }) as Layer[];

  renderableLayers = renderableLayers.filter(layer => {
    if (!layer.canOnlyAccompany) {
      return true;
    }

    const rules = layer.canOnlyAccompany;
    // get this layer's required elements
    const requiredElements = Object.keys(rules)
      .filter(key => {
        // @todo: this is a function
        if (key.startsWith('/') && key.endsWith('/')) {
          return Boolean(
            layer.selectedElement?.name.match(
              new RegExp(key.replace(/\//g, ''), 'g')
            )
          );
        }
        // @todo: this is a function
        return (
          key === '*' ||
          `${layer.name}.${key}` ===
            `${layer.name}.${layer.selectedElement?.name}`
        );
      })
      .map(key => rules[key])
      .flat();

    if (!requiredElements.length) {
      return true;
    }

    const hasRequiredElements = requiredElements.some(requiredElement => {
      const [requiredLayerName, requiredElementName] = requiredElement.split(
        '.'
      ) as [string, string | undefined];

      const requiredLayer = renderableLayers.find(
        x => x.name === requiredLayerName
      );

      if (!requiredLayer) {
        return false;
      }

      if (!requiredElementName) {
        return true;
      }

      const regexQuery =
        requiredElementName?.startsWith('/') &&
        requiredElementName?.endsWith('/') &&
        requiredElementName?.replace(/\//g, '');

      if (regexQuery) {
        return Boolean(
          requiredLayer?.selectedElement?.name.match(
            new RegExp(regexQuery, 'g')
          )
        );
      }

      return requiredElementName === requiredLayer.selectedElement?.name;
    });

    return hasRequiredElements;
  });

  const nonRenderableLayers = layers.filter(
    l => !renderableLayers.find(rl => rl.name === l.name)
  );

  nonRenderableLayers.forEach(layer => {
    if (layer.groupWith) {
      const rules = layer.groupWith;
      const foundLayer = renderableLayers.find(x => rules.includes(x.name));

      if (foundLayer && foundLayer.selectedElement) {
        renderableLayers.push({
          ...layer,
          selectedElement: layer.elements?.find(
            x => x.name === foundLayer.selectedElement?.name
          ),
        });
      }
    }
  });

  return [renderableLayers, nonRenderableLayers];
};

export default mapSelectedElementsToLayers;
