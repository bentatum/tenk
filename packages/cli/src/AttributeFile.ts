import { Attribute, AttributeConfig } from "@tenk/engine";

export interface AttributeFileConfig {
  height: number;
  width: number;
  path: string;
}

export default class AttributeFile extends Attribute {
  height: number;
  width: number;
  path: string;

  constructor(
    attributeConfig: AttributeConfig,
    { height, width, path }: AttributeFileConfig
  ) {
    super(attributeConfig);
    this.height = height;
    this.width = width;
    this.path = path;
  }
}
