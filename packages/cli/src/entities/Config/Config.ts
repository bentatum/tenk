import { configPath } from "@/env";
import { TenkConfig } from "@/interfaces";
import { injectable } from "inversify";
import fs from "fs";

let _config: TenkConfig;

@injectable()
export class Config {
  constructor() {
    if (!_config && fs.existsSync(configPath)) {
      _config = require(configPath) as TenkConfig;
    }
  }

  set(config: TenkConfig) {
    _config = {
      ..._config,
      ...config,
    };
  }

  get(key: string) {
    if (_config) {
      return _config[key];
    }
  }
}
