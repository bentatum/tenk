import { FC, forwardRef } from "react";
import classNames from "classnames";
import { BrandColors, StatusColors } from "@/types";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";

export interface IconButtonProps extends ButtonBaseProps {
  href?: string;
  color?: "neutral" | BrandColors | StatusColors;
  size?: "sm" | "md" | "lg";
  variant?: "text" | "contained";
}

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    {
      size = "md",
      variant = "text",
      color = "neutral",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <ButtonBase
        {...props}
        ref={ref}
        className={classNames(
          "rounded-full p-1 min-h-full min-w-full",
          "uppercase inline-flex items-center justify-center",
          "transition ease-in duration-200 text-center",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-white",
          color === "neutral" && variant === "text"
            ? "hover:bg-gray-400/20 focus:ring-gray-500/50 dark:active:bg-gray-300/20 dark:hover:bg-gray-500/20 dark:focus:ring-gray-500/50 dark:active:bg-gray-300/20"
            : undefined,
          {
            "h-14 w-14": size === "lg",
            "h-10 w-10": size === "md",
            "h-9 w-9": size === "sm",
            "text-current": variant === "text",
            "drop-shadow focus:drop-shadow-none active:drop-shadow-none":
              variant === "contained",
            "bg-green-500 text-white focus:ring-pink-500/50":
              variant === "contained" && color === "green",
            "hover:bg-pink-500/20 focus:ring-pink-500/50":
              color === "green" && variant === "text",
            "text-teal-500 hover:bg-teal-500/50 focus:ring-teal-500":
              color === "teal",
          },
          props.className
        )}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
