import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";

jest.mock("@/inversify.config", () => ({
  container: {
    get: jest.fn(),
  },
}));
const mockedContainerGet = createMock(container.get);

const cmd = async (...args: string[]): Promise<void> => {
  process.argv = ["/mock/path/to/node", "/mock/path/to/bin/cli.js", ...args];
  return require("@/cli");
};

describe("cli default command", () => {
  let originalArgv;

  beforeEach(() => {
    // this breaks it :(
    // jest.resetModules();
    originalArgv = process.argv;
  });

  afterEach(() => {
    // jest.resetAllMocks();
    process.argv = originalArgv;
  });

  it("should should set the config and log that it is in disabled dna mode", async () => {
    const config = {
      get: jest.fn().mockImplementation((key) => {
        switch (key) {
          case "disableDna":
            return true;
          default:
            return undefined;
        }
      }),
      set: jest.fn(),
    };

    const logger = {
      info: jest.fn(),
    };

    const collection = {
      create: jest.fn(),
    };

    mockedContainerGet.mockImplementation((name) => {
      switch (name) {
        case "Config":
          return config;
        case "Logger":
          return logger;
        case "Collection":
          return collection;
      }
    });

    await cmd("--disable-dna");
    expect(collection.create).toBeCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(
      expect.objectContaining({ disableDna: true })
    );
    expect(logger.info).toHaveBeenNthCalledWith(4, expect.stringContaining("DNA disabled"));
  });
});
