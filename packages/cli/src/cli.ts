#!/usr/bin/env node
import argv from "@/argv";
import { Collection } from "@/entities";
import { container } from "@/inversify.config";

(async () => {
  const collection = container.get<Collection>("Collection");
  await collection.create(...argv(process.argv));
})();
