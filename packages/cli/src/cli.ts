#!/usr/bin/env node
import yargs from "yargs";
import { Collection } from "./interfaces";
import { container } from "./inversify.config";

const getArgs = (): [number] => {
  const args = yargs(process.argv.slice(2)).argv as any;
  const size = Number(args._[0] || 10000);
  return [size];
};

(async () => {
  const collection = container.get<Collection>("Collection");
  await collection.create(...getArgs());
})();
