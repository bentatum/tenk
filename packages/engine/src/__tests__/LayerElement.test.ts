import { LayerElement } from "../LayerElement";

describe("LayerElement", () => {
  test("zero weight", () => {
    const element = new LayerElement({
      name: "Red",
      weight: 0,
    });
    expect(element.weight).toBe(0);
  });
  test("undefined weight", () => {
    const element = new LayerElement({
      name: "Red",
    });
    expect(element.weight).toBe(1);
  });
});
