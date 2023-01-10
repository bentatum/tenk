import { Collection } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import tenk from "@tenk/engine";
import { SingleBar } from "cli-progress";
import { FileType } from "@/interfaces";

const CollectionFactory = () => container.get<Collection>("Collection");

jest.mock("cli-progress");
const mockedProgressBar = createMock(SingleBar);

jest.mock("@tenk/engine");
const mockedTenk = createMock(tenk);

jest.mock("@/env", () => ({
  buildDir: "/.tenk",
  assetsDir: "/.tenk/assets",
}));

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
    const svgFileCreate = jest.fn().mockReturnThis();

    beforeEach(async () => {
      collection = CollectionFactory();
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      const layer1 = jest.fn();
      const layer2 = jest.fn();
      collection.layers = [layer1, layer2] as any;
      collection.svgFileFactory = jest.fn().mockReturnValue({
        create: svgFileCreate,
        delete: jest.fn(),
      }) as any;
      collection.pngFile = {
        setupCanvas: jest.fn(),
        create: jest.fn(),
      } as any;
      collection.writeSingleMetadata = jest.fn();
      collection.writeMetadataJson = jest.fn();
      collection.writeCollectionJson = jest.fn();
      collection.layerFactory = jest.fn().mockReturnValue({
        create: jest.fn().mockReturnThis(),
        getFileType: jest.fn().mockReturnValue(FileType.SVG),
      });
      // mock tenk
      mockedTenk.mockReturnValue(mockedMetadata as any);
      // mock progress bar
      mockedProgressBar.mockReturnValue({
        start: startProgressBar,
        update: updateProgressBar,
        stop: stopProgressBar,
        increment: incrementProgressBar,
      } as any);
      // mock config
      collection.config = {
        get: jest.fn().mockImplementation((key) => {
          switch (key) {
            case "size":
              return 10000;
            case "formats":
              return "svg";
            default:
              return undefined;
          }
        }),
      } as any;
      // run
      await collection.create();
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

    it("renders to svg", () => {
      const svgPath = `/.tenk/assets/0.svg`;
      expect(collection.pngFile.setupCanvas).toBeCalledTimes(0);
      expect(collection.pngFile.create).toBeCalledTimes(0);
      expect(svgFileCreate).toBeCalledWith(
        mockedAttributes,
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
      expect(collection.writeMetadataJson).toBeCalledTimes(1);
      expect(collection.writeMetadataJson).toBeCalledWith(mockedMetadata);
    });
  });

  describe("svg project, format defined", () => {
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
    const svgFileCreate = jest.fn().mockReturnThis();
    const svgFileDelete = jest.fn()

    beforeEach(async () => {
      collection = CollectionFactory();
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      collection.layers = [jest.fn(), jest.fn()] as any;
      collection.svgFileFactory = jest.fn().mockReturnValue({
        create: svgFileCreate,
        delete: svgFileDelete,
      }) as any;
      collection.pngFile = {
        setupCanvas: jest.fn(),
        create: jest.fn(),
      } as any;
      collection.writeSingleMetadata = jest.fn();
      collection.writeMetadataJson = jest.fn();
      collection.writeCollectionJson = jest.fn();
      collection.layerFactory = jest.fn().mockReturnValue({
        create: jest.fn().mockReturnThis(),
        getFileType: jest.fn().mockReturnValue(FileType.SVG),
      });
      // mock tenk
      mockedTenk.mockReturnValue(mockedMetadata as any);
      // mock progress bar
      mockedProgressBar.mockReturnValue({
        start: startProgressBar,
        update: updateProgressBar,
        stop: stopProgressBar,
        increment: incrementProgressBar,
      } as any);
    });

    test("svg only", async () => {
      // mock config
      collection.config = {
        get: jest.fn().mockImplementation((key) => {
          switch (key) {
            case "size":
              return 10000;
            case "formats":
              return "svg";
            default:
              return undefined;
          }
        }),
      } as any;
      await collection.create();
      expect(collection.pngFile.setupCanvas).not.toBeCalled();
      expect(svgFileCreate).toBeCalled();
      expect(collection.pngFile.create).not.toBeCalled();
    });

    test("png only", async () => {
      collection.config = {
        get: jest.fn().mockImplementation((key) => {
          switch (key) {
            case "size":
              return 10000;
            case "formats":
              return "png";
            default:
              return undefined;
          }
        }),
      } as any;
      await collection.create();
      expect(collection.pngFile.setupCanvas).toBeCalled();
      expect(svgFileCreate).toBeCalled();
      expect(svgFileDelete).toBeCalled();
      expect(collection.pngFile.create).toBeCalled();
    });

    test("both svg and png", async () => {
      collection.config = {
        get: jest.fn().mockImplementation((key) => {
          switch (key) {
            case "size":
              return 10000;
            case "formats":
              return "svg,png";
            default:
              return undefined;
          }
        }),
      } as any;
      await collection.create();
      expect(collection.pngFile.setupCanvas).toBeCalled();
      expect(svgFileCreate).toBeCalled();
      expect(collection.pngFile.create).toBeCalled();
    });
  });

  describe("tenk returns empty metadata", () => {
    it("should exit and console warn with a message", async () => {
      const collection = container.get<Collection>("Collection");
      collection.config = {
        get: jest.fn().mockImplementation((key) => {
          switch (key) {
            case "size":
              return 10000;
            case "formats":
              return "svg,png";
            default:
              return undefined;
          }
        }),
      } as any;
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      collection.layers = [jest.fn(), jest.fn()] as any;
      collection.layerFactory = jest.fn().mockReturnValue({
        create: jest.fn().mockReturnThis(),
        getFileType: jest.fn().mockReturnValue(FileType.SVG),
      });
      // mock tenk
      mockedTenk.mockReturnValue([]);
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      // run
      await collection.create();
      expect(warnSpy).toBeCalledWith(
        "No metadata generated. Check your layers for errors."
      );
      expect(exitSpy).toBeCalledTimes(1);
    });
  });

  describe("png project - format defined", () => {
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
    const svgFileCreate = jest.fn().mockReturnThis();

    beforeEach(async () => {
      collection = CollectionFactory();
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      collection.svgFileFactory = jest.fn().mockReturnValue({
        create: svgFileCreate,
        delete: jest.fn(),
      }) as any;
      collection.pngFile = {
        setupCanvas: jest.fn(),
        create: jest.fn(),
      } as any;
      collection.writeSingleMetadata = jest.fn();
      collection.writeMetadataJson = jest.fn();
      collection.writeCollectionJson = jest.fn();
      collection.layerFactory = jest.fn().mockReturnValue({
        create: jest.fn().mockReturnThis(),
        getFileType: jest.fn().mockReturnValue(FileType.PNG),
      });
      // mock tenk
      mockedTenk.mockReturnValue(mockedMetadata as any);
      // mock progress bar
      mockedProgressBar.mockReturnValue({
        start: startProgressBar,
        update: updateProgressBar,
        stop: stopProgressBar,
        increment: incrementProgressBar,
      } as any);
    });

    test("png only", async () => {
      collection.config = {
        get: jest.fn().mockImplementation((key) => {
          switch (key) {
            case "size":
              return 10000;
            case "formats":
              return "png";
            default:
              return undefined;
          }
        }),
      } as any;
      await collection.create();
      expect(collection.pngFile.setupCanvas).toBeCalled();
      expect(svgFileCreate).not.toBeCalled();
      expect(collection.pngFile.create).toBeCalled();
    });
  });
});
