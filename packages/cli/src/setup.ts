import fs from 'fs';
import { buildDir } from './env';

const setup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/png`);
  fs.mkdirSync(`${buildDir}/svg`);
};

export default setup;
