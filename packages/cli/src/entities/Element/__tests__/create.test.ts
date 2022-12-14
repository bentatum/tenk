import { FileType } from "@/interfaces";
import { container } from "@/inversify.config";
import { Element } from "../Element";

jest.mock("image-size", () =>
  jest.fn().mockReturnValue({
    width: 100,
    height: 100,
  })
);

describe("Element.create", () => {
  let element: Element;
  beforeEach(() => {
    jest.clearAllMocks();

    element = container.get<Element>("Element");
    element.create({
      path: "/layers/Shirt/Color/Blue.png",
      weight: 1,
      metadata: {
        fileType: FileType.PNG,
      },
    });
  });

  it("should define the name", () => {
    expect(element.name).toBe("Blue.png");
  });

  it("should define the weight", () => {
    expect(element.weight).toBe(1);
  });

  it("should define the metadata", () => {
    expect(element.metadata).toEqual({
      path: "/layers/Shirt/Color/Blue.png",
      fileType: FileType.PNG,
      width: 100,
      height: 100,
    });
  });
});
