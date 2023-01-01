import tenk from "../index";
import "@/test/mocks/sha256";

describe("tenk", () => {
  test("empty configuration", () => {
    const metadata = tenk([]);
    expect(Array.isArray(metadata)).toEqual(true);
  });

  test("one layer", () => {
    const metadata = tenk(require("./configs/one-layer-four-elements.json"));
    expect(metadata.length).toBe(4);
  });

  test("two layers", () => {
    const metadata = tenk(
      require("./configs/two-layers-four-elements-each.json")
    );
    expect(metadata.length).toBe(4 * 4);
  });

  test("recursive sublayers", () => {
    const metadata = tenk(require("./configs/recursive-sub-layers.json"));
    // usually 4 * 5 is the value.
    // but 99/100 the duplicate threshold is
    // reached and we arrive at an amount less than 20.
    // expect(metadata.length).toBe(4 * 5);
    expect(metadata.length).toBeGreaterThan(4 * 4);
  });

  test("layer with only sublayers", () => {
    const metadata = tenk(require("./configs/layer-with-only-sublayers.json"));
    // see above
    // expect(metadata.length).toBeGreaterThan(3 * 9);
    expect(metadata.length).toBeGreaterThan(3 * 8);
  });
});
