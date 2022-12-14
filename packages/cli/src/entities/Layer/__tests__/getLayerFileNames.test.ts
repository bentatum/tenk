import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Layer } from "../Layer";
import fs from "fs";
import { createMock } from "ts-jest-mock";

const layer = container.get<Layer>("Layer");

jest.mock("fs");
const readdirSyncMock = createMock(fs.readdirSync);

describe("Layer.getLayerFileNames", () => {
  it("calls fs readFileSync", () => {
    readdirSyncMock.mockReturnValueOnce([
      {
        isFile: () => true,
        name: "test.svg",
      },

      {
        isFile: () => true,
        name: "test-test.svg",
      },
    ] as any);

    const result = layer.getLayerFileNames();
    expect(result).toEqual(["test.svg", "test-test.svg"]);
  });

  it("should warn and set the exit code to 1 if readdirSync throws", () => {
    readdirSyncMock.mockImplementationOnce(() => {
      throw new Error("test");
    });

    const warnMock = jest.fn();
    layer.logger = { ...layer.logger, warn: warnMock };
    layer.getLayerFileNames();
    expect(warnMock).toHaveBeenCalledTimes(1);
    expect(process.exitCode).toBe(1);
  });
});
