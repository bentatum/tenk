import { container } from "@/inversify.config";
import { Logger } from "../Logger";

const logger = container.get<Logger>("Logger");

describe("Logger", () => {
  describe("verbose", () => {
    it("should log if verbose is true", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});
      logger.config.set({ verbose: true });
      logger.verbose("foo");
      expect(spy).toHaveBeenCalledWith("foo");
      spy.mockRestore();
    });

    it("should not log if verbose is false", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});
      logger.config.set({ verbose: false });
      logger.verbose("foo");
      expect(spy).not.toHaveBeenCalledWith("foo");
      spy.mockRestore();
    });
  });
});
