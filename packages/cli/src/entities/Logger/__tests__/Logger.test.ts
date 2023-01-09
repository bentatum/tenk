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

  describe("debug", () => {
    it("should log with a DEBUG prefix", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});
      logger.debug("foo");
      expect(spy).toHaveBeenCalledWith("DEBUG:", "foo");
      spy.mockRestore();
    });
  });

  describe("warn", () => {
    it("should log with a warning emoji", () => {
      const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
      logger.warn("foo");
      expect(spy).toHaveBeenCalledWith("⚠️", "foo");
      spy.mockRestore();
    });
  });

  describe('info', () => {
    it('should log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.info('foo');
      expect(spy).toHaveBeenCalledWith('foo');
      spy.mockRestore();
    });
  })
});
