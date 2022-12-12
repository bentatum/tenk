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

describe("cli", () => {
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

  it.todo("should call the default command with default arguments");

  it("should call the default command with custom arguments", async () => {
    const mockCreate = jest.fn().mockResolvedValue({});
    const mockConfigSet = jest.fn();
    mockedContainerGet
      .mockReturnValueOnce({ set: mockConfigSet } as any)
      .mockReturnValueOnce({ create: mockCreate } as any);
    await cmd("-s", "100", "-f", "svg,png", "-v");
    expect(mockConfigSet).toBeCalledTimes(1);
    expect(mockConfigSet).toBeCalledWith({
      size: 100,
      formats: "svg,png",
      verbose: true,
    });
    expect(mockCreate).toBeCalledTimes(1);
  });
});
