import { container } from "@/inversify.config";
import { createMock } from "ts-jest-mock";
import argv from "@/argv";

jest.mock("../argv");
const mockedArgv = createMock(argv);

jest.mock("@/inversify.config");
const mockedContainerGet = createMock(container.get);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("main", () => {
  it("should call collection.create", () => {
    const mockedSize = 10;
    const mockedFormats = "svg";
    mockedArgv.mockReturnValue([mockedSize, mockedFormats]);
    const mockedCreate = jest.fn();
    mockedContainerGet.mockReturnValue({ create: mockedCreate } as any);
    require("@/cli");
    expect(mockedContainerGet).toBeCalledWith("Collection");
    expect(mockedCreate).toBeCalledWith(mockedSize, mockedFormats);
  });
});
