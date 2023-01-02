import classNames from "classnames";
import { ComponentPropsWithRef, ElementType, FC, forwardRef } from "react";

export interface ButtonBaseProps extends ComponentPropsWithRef<any> {
  as?: ElementType;
}

export const ButtonBase: FC<ButtonBaseProps> = forwardRef<any, ButtonBaseProps>(
  ({ as, className = "", ...props }, ref) => {
    const Component = as || "button";
    return (
      <Component
        {...props}
        role={Component !== "button" ? "button" : undefined}
        ref={ref}
        className={classNames(
          "focus:outline-none",
          {
            "cursor-pointer disabled:cursor-not-allowed": !className.match(/cursor-|disabled:cursor-/),
            "inline-flex items-center justify-center": !className.match(/block|flex|items-|justify-/),
          },
          className
        )}
      />
    );
  }
);

ButtonBase.displayName = "ButtonBase";

export default ButtonBase;
