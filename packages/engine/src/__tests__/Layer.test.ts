import { Layer } from "../Layer";

describe("Layer", () => {
  test("basic configuration", () => {
    const layer = new Layer({
      name: "Background",
      elements: [
        {
          name: "Red",
        },
        {
          name: "Green",
        },
        {
          name: "Yellow",
        },
        {
          name: "Blue",
        },
      ],
    });
    expect(layer.elements.length).toBe(4);
  });
});
