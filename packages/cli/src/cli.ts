#!/usr/bin/env node

import { Collection, Config } from "@/entities";
import { container } from "@/inversify.config";
import yargs from "yargs";

interface Argv {
  size?: number;
  formats?: string;
  verbose?: boolean;
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
      argv.positional("verbose", {
        type: "boolean",
        default: false,
        describe: "Enable verbose logging",
        alias: "v",
      });
    },
    async ({ size, formats, verbose }) => {
      // Setup the config
      container.get<Config>("Config").set({ size, formats, verbose });
      // Create the collection
      await container.get<Collection>("Collection").create({ size, formats });
    }
  )
  .help().argv;
