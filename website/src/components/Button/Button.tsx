import { FC, forwardRef } from "react";
import classNames from "classnames";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";
import Spinner from "../Spinner";
import ButtonUnderline from "./components/ButtonUnderline";

export interface ButtonProps extends ButtonBaseProps {
  color?: "primary" | "secondary" | "neutral" | "destructive";
  variant?: "text" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  href?: string;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
  (
    {
      size = "md",
      variant = "text",
      color = "neutral",
      disabled,
      className,
      children,
      loading,
      ...props
    },
    ref
  ) => {
    const hasContainer =
      variant === "outlined" && color === "primary" && !disabled;

    const buttonProps = {
      ...props,
      ref,
      disabled,
      className: classNames(
        "whitespace-nowrap tracking-widest",
        "transition duration-200 ease-in-out",
        {
          uppercase:
            !className?.includes("normal-case") &&
            !className?.includes("lowercase"),
          "rounded-md": !className?.includes("rounded"),
          "font-bold": !className?.includes("font-"),
          "pointer-events-none": loading,

          /**
           * Sizes
           */
          // Sm
          ...(size === "sm" && {
            "text-sm px-3": true,
            "min-h-[36px]": !hasContainer,
            "min-h-[34px]": hasContainer,
          }),
          // Md
          ...(size === "md" && {
            "text-base px-4": true,
            "min-h-[44px]": !hasContainer,
            "min-h-[42px]": hasContainer,
          }),
          // Lg
          ...(size === "lg" && {
            "px-5 text-xl": true,
            "min-h-[60px]": !hasContainer,
            "min-h-[58px]": hasContainer,
          }),

          /**
           * Variants
           */
          // Text
          ...(variant === "text" && {
            "hover:bg-gray-200/40 hover:shadow focus:shadow-sm": color === "neutral",
            "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400":
              color === "primary",
          }),
          // Filled
          ...(variant === "filled" && {
            "text-white disabled:bg-neutral-300 dark:disabled:bg-neutral-500":
              true,
            ...(color === "neutral" && {
              "bg-black hover:bg-neutral-600 active:bg-neutral-500 disabled:bg-neutral-300":
                true,
              "dark:bg-white dark:hover:bg-neutral-100 dark:active:bg-neutral-200 dark:text-black":
                true,
            }),
            "bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400":
              color === "primary" && !disabled,
            // secondary
            "bg-pink-500 hover:bg-pink-600 active:bg-pink-700 disabled:bg-pink-300":
              color === "secondary",
            // destructive
            "bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-400":
              color === "destructive",
          }),
          // Outlined
          ...(variant === "outlined" && {
            relative: true,
            ...(color === "neutral" && {
              "text-black hover:text-neutral-500 active:text-neutral-500 disabled:text-neutral-300":
                true,
              "dark:text-white dark:hover:text-gray-200 dark:active:text-gray-300":
                true,
              "border border-black hover:border-neutral-600 active:border-neutral-500 active:border-neutral-200 disabled:border-neutral-300":
                color === "neutral" && !className?.includes("border-"),
              "dark:border-neutral-700 dark:hover:border-neutral-500 dark:active:border-neutral-400 dark:disabled:border-neutral-600":
                color === "neutral" && !className?.includes("border-"),
            }),
            ...(color === "primary" && {
              border: disabled,
              "border-none bg-white": !disabled,
              "disabled:text-neutral-400 disabled:border-neutral-300": true,
            }),
            // primary & secondary shared
            "text-pink-500 hover:text-pink-600 active:text-pink-700":
              color === "primary" || color === "secondary",
            // secondary
            "border border-pink-500 hover:border-pink-600 active:border-pink-700 disabled:border-pink-300 disabled:text-pink-300":
              color === "secondary",
            // destructive
            "border border-red-500 hover:border-red-600 active:border-red-700 disabled:border-red-400":
              color === "destructive",
            "text-red-500 hover:text-red-600 active:text-red-700 disabled:text-red-400":
              color === "destructive",
          }),
        },
        className
      ),
      children: loading ? <Spinner /> : children,
    };

    if (hasContainer) {
      return (
        <div
          role="presentation"
          className="p-[1px] rounded-full bg-gradient-to-r from-yellow-100 to-pink-400 hover:from-yellow-800 hover:to-pink-500 active:from-yellow-900 active:to-pink-600"
        >
          <ButtonBase {...buttonProps} />
        </div>
      );
    }

    return <ButtonBase {...buttonProps} />;
  }
);

Button.displayName = "Button";

export default Button;
