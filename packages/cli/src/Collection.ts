// import fs from "fs";
// import { LayerConfig } from "@tenk/engine";
// import { cwd, layersDir, buildDir } from "./env";
import { LayerDirectory } from "./LayerDirectory";
// import { Service } from "typedi";

// export interface ProjectConfig {
//   layers?: Record<string, LayerConfig>;
// }

import { injectable } from "tsyringe";

@injectable()
export class Collection {
  constructor(private layerDirectoryFactory: LayerDirectory) {}
}

// @Service()
// export class Collection {
// constructor(public layerDirectoryFactory: LayerDirectory) {}

// make(size: number) {
//   // this.setupOutDir();
//   // const folders = await this.getLayerDirNames();
//   console.log(this.layerDirectoryFactory.create);
//   // const config = this.getConfig();
//   // const layerDirectoryFactory = Container.get(LayerDirectory);

//   // await Promise.all(
//   //   folders.map(async (name) => {
//   //     return await this.layerDirectoryFactory.create(name);
//   //     // const ld = new LayerDirectory(name);
//   //     // return await ld.setup();
//   //   })
//   // );
// }

// async getLayerDirNames(): Promise<string[]> {
//   return (await fs.promises.readdir(layersDir, { withFileTypes: true }))
//     .filter((dirent) => dirent.isDirectory())
//     .map((dirent) => dirent.name);
// }

// getConfig(): ProjectConfig {
//   const configPath = fs
//     .readdirSync(cwd)
//     .find((file) => file.includes("tenk.config"));
//   if (configPath) {
//     return require(`${cwd}/${configPath}`);
//   }
// }

// setupOutDir() {
//   if (fs.existsSync(buildDir)) {
//     fs.rmSync(buildDir, { recursive: true });
//   }
//   fs.mkdirSync(buildDir);
//   fs.mkdirSync(`${buildDir}/json`);
//   fs.mkdirSync(`${buildDir}/png`);
//   fs.mkdirSync(`${buildDir}/svg`);
// }
// }
