#!/usr/bin/env node

import { Collection, Config } from "@/entities";
import { container } from "@/inversify.config";
import yargs from "yargs";
import { Logger } from "./entities/Logger";

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
        describe: "The size of your nft collection.",
        alias: "s",
      });
      argv.positional("formats", {
        type: "string",
        describe: "Comma delimited string of desired output formats.",
        alias: "f",
      });
      argv.positional("verbose", {
        type: "boolean",
        describe: "Enable verbose logging.",
        alias: "v",
      });
      argv.positional("disable-dna", {
        type: "boolean",
        describe: "Disable DNA generation.",
      });
    },
    async (argv) => {
      // Setup the config
      const config = container.get<Config>("Config");
      config.set(
        // we don't want to pass undefined values to the config
        Object.keys(argv)
          .filter((key) => argv[key] !== undefined)
          .reduce((obj, key) => {
            // @ts-expect-error todo
            obj[key] = argv[key];
            return obj;
          }, {})
      );

      // Welcome message
      const logger = container.get<Logger>("Logger");
      logger.info("Name: ", config.get("name"));
      logger.info("Symbol: ", config.get("symbol"));
      logger.info("Size: ", config.get("size"));

      if (config.get("disableDna")) {
        logger.info("🧬 DNA disabled");
      }

      logger.info("Description: ", config.get("description"));
      // Create the collection
      await container.get<Collection>("Collection").create();
    }
  )
  .help().argv;
