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
  let originalArgv: string[];

  beforeEach(() => {
    // this breaks it :(
    // jest.resetModules();
    originalArgv = process.argv;
  });

  afterEach(() => {
    // jest.resetAllMocks();
    process.argv = originalArgv;
  });

  it("should call the default command with default arguments", async () => {
    const config = {
      get: jest.fn(),
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

    await cmd();
    expect(collection.create).toBeCalledTimes(1);
    expect(logger.info).toBeCalledTimes(4);
  });
});
