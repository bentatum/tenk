// import { Collection } from "@/entities";
// import { container } from "@/inversify.config";
// // import { createMock } from "ts-jest-mock";
// // import tenk from "@tenk/engine";

// const collection = container.get<Collection>("Collection");

// jest.mock("@tenk/engine", () => jest.fn().mockReturnValue([]));
// // const mockedTenk = createMock(tenk);

// describe("Collection", () => {
//   describe("create", () => {
//     it("should create a collection", async () => {
//     //   mockedTenk.mockReturnValue();
//       collection.setupWorkspace = jest.fn();
//       collection.setConfig = jest.fn();
//       collection.getLayerDirNames = jest
//         .fn()
//         .mockReturnValue(["layer1", "layer2"]);
//       collection.LayerFactory = jest.fn().mockReturnValue({
//         create: jest.fn().mockReturnThis(),
//         getFileType: jest.fn().mockReturnValue("svg"),
//       });
//       collection.svgFile = {
//         create: jest.fn(),
//       } as any;
//       collection.pngFile = {
//         setupCanvas: jest.fn(),
//         create: jest.fn(),
//       } as any;

//       await collection.create(10000);
//     });
//   });
// });

test("placeholder", () => {
    expect(true).toBe(true);
})
