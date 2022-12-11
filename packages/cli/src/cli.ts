#!/usr/bin/env node

import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import yargs from "yargs";

interface Argv {
  size?: number;
  formats?: string;
}

yargs
  .scriptName("tenk")
  .usage("Usage: $0 <command> [options]")
  .command<Argv>(
    "$0",
    "Build your NFT collection",
    (argv) => {
      argv.positional("size", {
        type: "number",
        default: 10000,
        describe: "The size of your nft collection",
        alias: "s",
      });
      argv.positional("formats", {
        type: "string",
        default: "svg",
        describe: "Comma delimited string of desired output formats",
        alias: "f",
      });
    },
    async ({ size, formats }) => {
      const collection = container.get<Collection>("Collection");
      await collection.create({ size, formats });
    }
  )
  .help().argv;
