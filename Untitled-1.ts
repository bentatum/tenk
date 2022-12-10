#!/usr/bin/env node

import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import yargs from "yargs";

interface Argv {
  size?: number;
  formats?: string;
  verbose?: boolean;
}

(async () => {
  yargs
    .scriptName("tenk")
    .usage("$0 <cmd> [args]")
    .command<Argv>(
      ["$0", "build"],
      "build your nft collection",
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
        });
      },
      async ({ size, formats, verbose }) => {
        const collection = container.get<Collection>("Collection");
        await collection.create({ size, formats, verbose });
      }
    )
    .help().argv;
})();
