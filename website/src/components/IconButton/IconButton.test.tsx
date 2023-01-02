import { render, screen } from "@testing-library/react";
import { SvgIcon } from "..";
import IconButton from "./IconButton";

const Icon = () => (
  <SvgIcon viewBox="0 0 24 24" className="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </SvgIcon>
);

describe("IconButton", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <IconButton>
        <Icon />
      </IconButton>
    );
    expect(container).toMatchSnapshot();
  });

  describe("text variant", () => {
    describe("neutral color", () => {
      it("should be visible on hover and focus", () => {
        render(
          <IconButton color="neutral" variant="text">
            <Icon />
          </IconButton>
        );
        expect(screen.getByRole("button")).toHaveClass(
          "hover:bg-gray-400/20",
          "focus:ring-gray-500/50",
          "dark:active:bg-gray-300/20",
          "dark:hover:bg-gray-500/20",
          "dark:focus:ring-gray-500/50",
          "dark:active:bg-gray-300/20"
        );
      });
    });

    describe("pink color", () => {
      it("should have hover and focus colors", () => {
        render(
          <IconButton color="pink" variant="text">
            <Icon />
          </IconButton>
        );
        expect(screen.getByRole("button")).toHaveClass(
          "hover:bg-pink-500/20",
          "focus:ring-pink-500/50"
        );
      });
    });
  });

  describe("contained variant", () => {
    describe("neutral", () => {
      it("should not have the same hover and focus colors as text variant", () => {
        render(
          <IconButton color="neutral" variant="contained">
            <Icon />
          </IconButton>
        );
        expect(screen.getByRole("button")).not.toHaveClass(
          "hover:bg-gray-400/20",
          "focus:ring-gray-500/50",
          "dark:active:bg-gray-300/20",
          "dark:hover:bg-gray-500/20",
          "dark:focus:ring-gray-500/50",
          "dark:active:bg-gray-300/20"
        );
      });
    });
  });
});
