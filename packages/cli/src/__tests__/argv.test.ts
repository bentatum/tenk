import argv from "../argv";
import yargs from "yargs";
import { createMock } from "ts-jest-mock";

jest.mock("yargs");
const mockedYargs = createMock(yargs);

describe("first argument: size", () => {
  test("default size", () => {
    mockedYargs.mockReturnValue({
      argv: {
        _: [],
      },
    } as any);
    expect(
      argv([
        "/Users/benjamintatum/.nvm/versions/node/v16.15.1/bin/node",
        "/usr/local/bin/tenk",
      ])
    ).toEqual([10000]);
  });

  test("defined size", () => {
    mockedYargs.mockReturnValue({
      argv: {
        _: [100],
      },
    } as any);
    expect(
      argv([
        "/Users/benjamintatum/.nvm/versions/node/v16.15.1/bin/node",
        "/usr/local/bin/tenk",
        "100",
      ])
    ).toEqual([100]);
  });
});

describe("second argument: output formats", () => {
  test("default output formats", () => {
    mockedYargs.mockReturnValue({
      argv: {
        _: [],
      },
    } as any);
    expect(
      argv([
        "/Users/benjamintatum/.nvm/versions/node/v16.15.1/bin/node",
        "/usr/local/bin/tenk",
      ])
    ).toEqual([10000]);
  });

  test("defined output formats", () => {
    mockedYargs.mockReturnValue({
      argv: {
        _: [100, "svg,png"],
      },
    } as any);
    expect(
      argv([
        "/Users/benjamintatum/.nvm/versions/node/v16.15.1/bin/node",
        "/usr/local/bin/tenk",
        undefined,
        "svg",
      ])
    ).toEqual([100, "svg,png"]);
  });
});
