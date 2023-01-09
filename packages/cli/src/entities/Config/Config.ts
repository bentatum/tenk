import { configPath } from "@/env";
import { TenkJsonConfig } from "@/interfaces";
import { injectable } from "inversify";
import fs from "fs";

let _config: TenkJsonConfig;

@injectable()
export class Config {
  constructor() {
    if (!_config && fs.existsSync(configPath)) {
      _config = require(configPath) as TenkJsonConfig;
      if (_config) {
        this.set(_config);
      }
    }
  }

  set(config: TenkJsonConfig) {
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
