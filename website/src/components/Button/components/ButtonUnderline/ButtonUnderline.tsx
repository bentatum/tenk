import { ButtonProps } from "@/components/Button";
import classNames from "classnames";
import { FC } from "react";

export interface ButtonUnderlineProps {
  color: ButtonProps["color"];
  disabled?: boolean;
}

export const ButtonUnderline: FC<ButtonUnderlineProps> = ({
  color,
  disabled,
}) => {
  return (
    <span
      role="presentation"
      className={classNames(
        "mx-auto",
        "h-0.5 w-11/12",
        "absolute inset-x-0 bottom-0",
        color === "neutral" && [
          "bg-black hover:bg-neutral-700 active:bg-neutral-600 disabled:bg-neutral-300",
          "dark:bg-white dark:hover:bg-neutral-300 dark:active:bg-neutral-400 dark:disabled:bg-neutral-500",
        ],
        color === "primary" && [
          disabled
            ? "bg-neutral-300"
            : "bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400",
        ],
        {
          "bg-pink-500 hover:bg-pink-600 active:bg-pink-700 disabled:bg-pink-300":
            color === "secondary",
          "bg-red-500 hover:bg-red-600 active:bg-red-700":
            color === "destructive",
        }
      )}
    />
  );
};
export default ButtonUnderline;
