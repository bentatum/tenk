import { configPath } from "@/env";
import { TenkConfig } from "@/interfaces";
import { injectable } from "inversify";
import fs from "fs";

let config: TenkConfig;

@injectable()
export class Config {
  init() {
    if (fs.existsSync(configPath)) {
      config = config || (require(configPath) as TenkConfig);
    }
  }
  get(key: string) {
    if (!config) this.init();
    return config[key];
  }
}
