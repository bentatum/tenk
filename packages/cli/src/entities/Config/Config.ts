import { configPath } from "@/env";
import { TenkConfig } from "@/interfaces";
import { injectable } from "inversify";
import fs from "fs";

@injectable()
export class Config {
  _config: TenkConfig;
  constructor() {
    if (fs.existsSync(configPath)) {
      this._config = require(configPath) as TenkConfig;
    }
  }
  get(key: string) {
    if (!this._config) {
      throw new Error("Config not initialized");
    }
    return this._config[key];
  }
}
