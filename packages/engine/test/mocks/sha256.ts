jest.mock(
  "@/lib/sha256",
  jest.fn(() => ({
    default: jest.fn((message: string = "") => {
      const shajs = require("sha.js");
      return shajs("sha256").update(message).digest("hex");
    }),
  }))
);
