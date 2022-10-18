import { Collection, Layer } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import tenk from "@tenk/engine";
import { SingleBar } from "cli-progress";
import { FileType } from "@/interfaces";
import fs from "fs";

const LayerFactory = () => container.get<Layer>("Layer");
const CollectionFactory = () => container.get<Collection>("Collection");

jest.mock("cli-progress");
const mockedProgressBar = createMock(SingleBar);

jest.mock("@tenk/engine");
const mockedTenk = createMock(tenk);

jest.mock("@/env", () => ({
  buildDir: "/test/build/dir",
}));

jest.mock("fs");
const mockedFsReaddirSync = createMock(fs.readdirSync);

jest.mock("image-size", () =>
  jest.fn().mockReturnValue({
    width: 100,
    height: 100,
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection.create", () => {
  describe("svg project", () => {
    let collection: Collection;
    const imgHeight = 100;
    const imgWidth = 100;
    const mockedAttributes = [
      {
        trait_type: "body",
        value: "normal",
        metadata: {
          height: imgHeight,
          width: imgWidth,
          path: "path/to/file.svg",
          fileType: FileType.SVG,
        },
      },
    ];
    const mockedMetadata = [
      {
        name: "0",
        attributes: mockedAttributes,
      },
    ];

    const startProgressBar = jest.fn();
    const incrementProgressBar = jest.fn();
    const updateProgressBar = jest.fn();
    const stopProgressBar = jest.fn();

    beforeEach(async () => {
      mockedFsReaddirSync.mockReturnValue([
        {
          name: "element1.svg",
          isFile: () => true,
        },
        {
          name: "element2.svg",
          isFile: () => true,
        },
      ] as any);
      collection = CollectionFactory();
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.setConfig = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      collection.layers = [
        LayerFactory().create("layer1"),
        LayerFactory().create("layer2"),
      ];
      collection.svgFile = {
        create: jest.fn(),
      } as any;
      collection.pngFile = {
        setupCanvas: jest.fn(),
        create: jest.fn(),
      } as any;
      collection.writeSingleMetadata = jest.fn();
      collection.writeMetadata = jest.fn();
      // mock tenk
      mockedTenk.mockReturnValue(mockedMetadata as any);
      // mock progress bar
      mockedProgressBar.mockReturnValue({
        start: startProgressBar,
        update: updateProgressBar,
        stop: stopProgressBar,
        increment: incrementProgressBar,
      } as any);
      // run
      await collection.create(10000);
    });

    it("should call tenk", () => {
      expect(mockedTenk).toBeCalledTimes(1);
      expect(mockedTenk).toBeCalledWith(collection.layers, { size: 10000 });
    });

    it("should use a progress bar", () => {
      expect(mockedProgressBar).toBeCalledTimes(1);
      expect(startProgressBar).toBeCalledWith(mockedMetadata.length, 0);
      expect(incrementProgressBar).toBeCalledTimes(1);
      expect(updateProgressBar).toBeCalledTimes(1);
      expect(updateProgressBar).toBeCalledWith(1);
      expect(stopProgressBar).toBeCalledTimes(1);
    });

    it("renders to svg and png", () => {
      const svgPath = `/test/build/dir/svg/0.svg`;
      const pngPath = `/test/build/dir/png/0.png`;
      expect(collection.pngFile.setupCanvas).toBeCalledWith(
        imgHeight,
        imgWidth
      );
      expect(collection.svgFile.create).toBeCalledWith(
        mockedAttributes,
        svgPath
      );
      expect(collection.pngFile.create).toBeCalledWith(
        mockedAttributes,
        pngPath,
        svgPath
      );
    });

    it("should write metadata json files for each token", () => {
      expect(collection.writeSingleMetadata).toBeCalledTimes(1);
      expect(collection.writeSingleMetadata).toBeCalledWith(
        mockedMetadata[0],
        0
      );
    });

    it("should write the entire collection to a single json file", () => {
      expect(collection.writeMetadata).toBeCalledTimes(1);
      expect(collection.writeMetadata).toBeCalledWith(mockedMetadata);
    });
  });

  describe("tenk returns empty metadata", () => {
    it("should exit and console warn with a message", async () => {
      const collection = container.get<Collection>("Collection");
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.setConfig = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      collection.layers = [
        LayerFactory().create("layer1"),
        LayerFactory().create("layer2"),
      ];
      // mock tenk
      mockedTenk.mockReturnValue([]);
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      // run
      await collection.create(10000);
      expect(warnSpy).toBeCalledWith(
        "No metadata generated. Check your layers for errors."
      );
      expect(exitSpy).toBeCalledTimes(1);
    });
  });

  describe("png project", () => {
    let collection: Collection;
    const imgHeight = 100;
    const imgWidth = 100;
    const mockedAttributes = [
      {
        trait_type: "body",
        value: "normal",
        metadata: {
          height: imgHeight,
          width: imgWidth,
          path: "path/to/file.png",
          fileType: FileType.PNG,
        },
      },
    ];
    const mockedMetadata = [
      {
        name: "0",
        attributes: mockedAttributes,
      },
    ];

    const startProgressBar = jest.fn();
    const incrementProgressBar = jest.fn();
    const updateProgressBar = jest.fn();
    const stopProgressBar = jest.fn();

    beforeEach(async () => {
      mockedFsReaddirSync.mockReturnValue([
        {
          name: "element1.png",
          isFile: () => true,
        },
        {
          name: "element2.png",
          isFile: () => true,
        },
      ] as any);
      collection = CollectionFactory();
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.setConfig = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      // const layer1 = LayerFactory().create("layer1");
      // layer1.updateMetadata({
      //   fileType: FileType.PNG,
      // });
      // const layer2 = LayerFactory().create("layer2");
      // collection.layers = [layer1, layer2];
      collection.svgFile = {
        create: jest.fn(),
      } as any;
      collection.pngFile = {
        setupCanvas: jest.fn(),
        create: jest.fn(),
      } as any;
      collection.writeSingleMetadata = jest.fn();
      collection.writeMetadata = jest.fn();
      // mock tenk
      mockedTenk.mockReturnValue(mockedMetadata as any);
      // mock progress bar
      mockedProgressBar.mockReturnValue({
        start: startProgressBar,
        update: updateProgressBar,
        stop: stopProgressBar,
        increment: incrementProgressBar,
      } as any);
      // run
      await collection.create(10);
    });

    it("renders to png", () => {
      const pngPath = `/test/build/dir/png/0.png`;
      expect(collection.pngFile.setupCanvas).toBeCalledWith(
        imgHeight,
        imgWidth
      );
      expect(collection.pngFile.create).toBeCalledWith(
        mockedAttributes,
        pngPath
      );
      expect(collection.svgFile.create).not.toBeCalled();
    });

    // it("should write metadata json files for each token", () => {
    //   expect(collection.writeSingleMetadata).toBeCalledTimes(1);
    //   expect(collection.writeSingleMetadata).toBeCalledWith(
    //     mockedMetadata[0],
    //     0
    //   );
    // });

    // it("should write the entire collection to a single json file", () => {
    //   expect(collection.writeMetadata).toBeCalledTimes(1);
    //   expect(collection.writeMetadata).toBeCalledWith(mockedMetadata);
    // });
  });
});
