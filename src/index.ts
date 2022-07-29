import setup from './setup';
import main from './main';
import { getConfig } from './utils';

(async () => {
  setup();
  const config = await getConfig();
  await main(config);
  // if (argv.metadataPath) {
  //   try {
  //     const metadata = JSON.parse(fs.readFileSync(argv.metadataPath) as any);
  //     start(metadata);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // } else {
  // start(setup());
  // }
})();
