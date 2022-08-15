import setup from './setup';
import tenk from '@tenk/engine';
import { getConfig } from './utils';
import { buildDir } from './env';
import createSvgFile from './createSvgFile';

(async () => {
  setup();
  const config = await getConfig();
  const metadata = await tenk(config);
  // render based on metadata
  metadata.forEach(({ edition, attributes }) => {
    const svgPath = `${buildDir}/svg/${edition}.svg`;
    createSvgFile(
      config,
      svgPath,
      attributes.map(({ trait_type, value }) => ({
        name: String(trait_type || value),
        selectedElement: {
          name: String(value),
        },
      }))
    );
  });
})();
