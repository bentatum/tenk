import setup from './setup';
import tenk from '@tenk/engine';
import { getConfig } from './utils';

(async () => {
  setup();
  const config = await getConfig();
  const metadata = await tenk(config);
  console.log({ metadata })
})();
