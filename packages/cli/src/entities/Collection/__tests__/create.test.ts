import { Collection, Layer } from "@/entities";
import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import tenk from "@tenk/engine";
import { SingleBar } from "cli-progress";

const LayerFactory = () => container.get<Layer>("Layer");

jest.mock("cli-progress");
const mockedProgressBar = createMock(SingleBar);

jest.mock("@tenk/engine");
const mockedTenk = createMock(tenk);

jest.mock("@/env", () => ({
  buildDir: "/test/build/dir",
}));

jest.mock("fs", () => ({
  readdirSync: jest.fn().mockReturnValue([
    {
      name: "element1.svg",
      isFile: () => true,
    },
    {
      name: "element2.svg",
      isFile: () => true,
    },
  ]),
}));

jest.mock("image-size", () =>
  jest.fn().mockReturnValue({
    width: 100,
    height: 100,
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection", () => {
  describe("create", () => {
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
        },
      },
    ];
    const mockedMetadata = [
      {
        name: "0",
        attributes: mockedAttributes,
      },
    ] as any;

    const startProgressBar = jest.fn();
    const incrementProgressBar = jest.fn();
    const updateProgressBar = jest.fn();
    const stopProgressBar = jest.fn();

    beforeEach(async () => {
      collection = container.get<Collection>("Collection");
      // mock internal collection methods
      collection.setupWorkspace = jest.fn();
      collection.setConfig = jest.fn();
      collection.getLayerDirNames = jest
        .fn()
        .mockReturnValue(["layer1", "layer2"]);
      collection.LayerFactory = jest.fn().mockReturnValue({
        create: jest.fn().mockReturnThis(),
        getFileType: jest.fn().mockReturnValue("svg"),
      });
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
      mockedTenk.mockReturnValue(mockedMetadata);
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
});
