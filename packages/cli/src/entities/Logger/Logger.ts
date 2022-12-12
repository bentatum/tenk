import { inject, injectable } from "inversify";
import { Config } from "../Config";

@injectable()
export class Logger {
  constructor(
    @inject("Config")
    public config: Config
  ) {}

  verbose(...args: any[]) {
    if (this.config.get("verbose")) {
      console.log(...args);
    }
  }
}
