import { container } from "@/inversify.config";
import { Layer } from "../Layer";
import fs from "fs";
import { createMock } from "ts-jest-mock";

const layer = container.get<Layer>("Layer");

jest.mock("fs");
const readdirSyncMock = createMock(fs.readdirSync);

describe("Layer.getLayerDirNames", () => {
  it("calls fs readFileSync", () => {
    readdirSyncMock.mockReturnValueOnce([
      {
        isDirectory: () => true,
        name: "Head",
      },

      {
        isDirectory: () => true,
        name: "Body",
      },
    ] as any);

    const result = layer.getLayerDirNames();
    expect(result).toEqual(["Head", "Body"]);
  });

  it("should warn and set the exit code to 1 if readdirSync throws", () => {
    readdirSyncMock.mockImplementationOnce(() => {
      throw new Error("test");
    });

    const warnMock = jest.fn();
    layer.logger = { ...layer.logger, warn: warnMock };
    layer.getLayerDirNames();
    expect(warnMock).toHaveBeenCalledTimes(1);
    expect(process.exitCode).toBe(1);
  });
});
