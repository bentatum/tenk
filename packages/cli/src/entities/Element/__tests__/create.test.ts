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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("no settings in the file name", () => {
    let element: Element;

    beforeEach(() => {
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
      expect(element.name).toBe("Blue");
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

  describe("settings in the name", () => {
    it("should define the weight if it is in the file name", () => {
      const element = container.get<Element>("Element");
      element.create({
        path: "/layers/Shirt/Color/Blue#50.png",
        metadata: {
          fileType: FileType.PNG,
        },
      });

      expect(element.weight).toBe(0.5);
    });

    it("should be overridden by the configuration options", () => {
      const element = container.get<Element>("Element");
      element.create({
        path: "/layers/Shirt/Color/Blue#50.png",
        weight: 0.2,
        metadata: {
          fileType: FileType.PNG,
        },
      });
      expect(element.weight).toBe(0.2);
    });
  });

  describe("undefined weight", () => {
    it("should default to 1", () => {
      const element = container.get<Element>("Element");
      element.create({
        path: "/layers/Shirt/Color/Blue.png",
        metadata: {
          fileType: FileType.PNG,
        },
      });
      expect(element.weight).toBe(1);
    });
  });
});
