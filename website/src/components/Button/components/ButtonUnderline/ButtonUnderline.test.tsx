import { render, screen } from "@testing-library/react";
import ButtonUnderline from "./ButtonUnderline";

describe("ButtonUnderline", () => {
  test("size and position", () => {
    render(<ButtonUnderline color="neutral" />);
    expect(screen.getByRole("presentation")).toHaveClass(
      "mx-auto",
      "h-0.5",
      "w-11/12",
      "absolute",
      "inset-x-0",
      "bottom-0"
    );
  });

  describe("neutral", () => {
    test("color", () => {
      render(<ButtonUnderline color="neutral" />);
      expect(screen.getByRole("presentation")).toHaveClass(
        "bg-black",
        "dark:bg-white",
        "hover:bg-neutral-700",
        "dark:hover:bg-neutral-300",
        "active:bg-neutral-600",
        "dark:active:bg-neutral-400",
        "disabled:bg-neutral-300",
        "dark:disabled:bg-neutral-500"
      );
    });

    test("snapshot", () => {
      const { container } = render(<ButtonUnderline color="neutral" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("primary", () => {
    test("color", () => {
      render(<ButtonUnderline color="primary" />);
      expect(screen.getByRole("presentation")).toHaveClass(
        "bg-gradient-to-r",
        "from-yellow-300",
        "via-orange-400",
        "to-pink-400"
      );
    });

    test('disabled', () => {
      render(<ButtonUnderline color="primary" disabled />);
      expect(screen.getByRole("presentation")).toHaveClass(
        "bg-neutral-300"
      );
    })

    test("snapshot", () => {
      const { container } = render(<ButtonUnderline color="primary" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("secondary", () => {
    test("color", () => {
      render(<ButtonUnderline color="secondary" />);
      expect(screen.getByRole("presentation")).toHaveClass(
        "bg-pink-500",
        "hover:bg-pink-600",
        "active:bg-pink-700"
      );
    });
    test("snapshot", () => {
      const { container } = render(<ButtonUnderline color="secondary" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("destructive", () => {
    test("color", () => {
      render(<ButtonUnderline color="destructive" />);
      expect(screen.getByRole("presentation")).toHaveClass(
        "bg-red-500",
        "hover:bg-red-600",
        "active:bg-red-700"
      );
    });
    test("snapshot", () => {
      const { container } = render(<ButtonUnderline color="destructive" />);
      expect(container).toMatchSnapshot();
    });
  });
});
