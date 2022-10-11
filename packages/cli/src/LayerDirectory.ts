// // import fs from "fs";
// // import path from "path";
// // import { Layer, LayerConfig } from "@tenk/engine";
// // import { layersDir } from "./env";
// // import LayerElementFile from "./LayerElementFile";
// // import { Service } from "typedi";
// import { injectable } from "tsyringe";
// import { Factory } from "./types";
// // import { Factory } from "@tenk/engine";

// // @Service()
// @injectable()
// export class LayerDirectory implements Factory {
//   // public path: string;
//   // public elements: LayerElementFile[];
//   // public name: string;
//   // public odds: number;

//   constructor() {}

//   // constructor(public elementFactory: LayerElementFile) {
//   //   super();
//   // }

//   create() {
//     console.log('hello')
//     // this.path = `${layersDir}/${name}`;
//     // await this.setElements();
//     // this.parseFileName();
//   }

//   //   path: string;

//   //   constructor(public dirName: string) {
//   //     super({
//   //       name: dirName,
//   //       elements: [],
//   //     });
//   //     this.dirName = dirName;
//   //     this.path = `${layersDir}/${dirName}`;
//   //     this.parseFileName();
//   //   }

//   // parseFileName() {
//   //   let odds = 1,
//   //     name = this.name;
//   //   // if the layer name starts with a number,
//   //   // it's the order of the layer, let's remove it.
//   //   if (name.match(/^([0-9]+_)/)) {
//   //     name = name.replace(/^([0-9]+_)/, "");
//   //   }
//   //   // if the layer name ends with a number,
//   //   // it's the weight of the layer, let's remove it.
//   //   if (name.match(/(#[0-9]+)$/)) {
//   //     odds = Number(name.split("#")[1]) / 100;
//   //     name = name.replace(/(#[0-9]+)$/, "");
//   //   }

//   //   this.odds = odds;
//   //   this.name = name;
//   // }

//   // async getLayerFiles(): Promise<string[]> {
//   //   return (await fs.promises.readdir(this.path, { withFileTypes: true }))
//   //     .filter(
//   //       (dirent) =>
//   //         dirent.isFile() &&
//   //         [".png", ".svg"].includes(path.extname(dirent.name))
//   //     )
//   //     .map((dirent) => dirent.name);
//   // }

//   // async setElements(): Promise<void> {
//   //   const fileNames = await this.getLayerFiles();
//   //   // we don't support mixed file types in a collection, yet.
//   //   // grab the first file and use it to determine the type.
//   //   // const fileType = path.extname(fileNames[0]);
//   //   this.elements = fileNames.map(this.elementFactory.create);
//   // }
// }
