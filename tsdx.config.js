const fs = require('fs');
const path = require('path');

function addShebangToOutput(options) {
  return {
    name: 'transform-code',
    ['buildEnd']: async () => {
      const file = path.resolve(__dirname, './dist/index.js');
      const data = await fs.readFileSync(file); //read existing contents into data
      const stringData = data.toString(); //convert the data to a string

      if (!stringData.startsWith('#!')) {
        const fd = await fs.openSync(file, 'w+');

        const buffer = Buffer.from('#!/usr/bin/env node \n', 'utf8');

        fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
        fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data

        fs.close(fd);
      }
    },
  };
}

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(addShebangToOutput(options));

    return config; // always return a config.
  },
};