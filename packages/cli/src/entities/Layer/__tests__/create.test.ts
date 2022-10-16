import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import { Layer } from "../Layer";
import fs from "fs";

const LayerFactory = () => container.get<Layer>("Layer");

jest.mock("fs");
const mockedFsReaddirSync = createMock(fs.readdirSync);

jest.mock("image-size", () =>
  jest.fn().mockReturnValue({
    width: 100,
    height: 100,
  })
);

describe("Layer.create", () => {
  it("creates a layer", () => {
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
    const layer = LayerFactory()
    layer.parseFileName = jest.fn();
    layer.updateMetadata = jest.fn();
    layer.create("test");
    expect(layer).toBeInstanceOf(Layer);
    expect(layer.parseFileName).toBeCalled();
    expect(layer.updateMetadata).toBeCalled()
  });

  // describe("config", () => {

  // })
});
