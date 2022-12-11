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
}

describe("cli", () => {
  // let originalArgv;

  // beforeEach(() => {
  //   jest.resetModules();
  //   originalArgv = process.argv;
  // });

  // afterEach(() => {
  //   jest.resetAllMocks();
  //   process.argv = originalArgv;
  // });

  it("should call the default command with default arguments", async () => {
    const mockedCreate = jest.fn();
    mockedContainerGet.mockReturnValue({ create: mockedCreate } as any);
    await cmd();
    expect(mockedCreate).toBeCalledTimes(1);
    expect(mockedCreate).toBeCalledWith({
      size: 10000,
      formats: "svg",
    });
  });
});

