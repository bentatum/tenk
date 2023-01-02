import classNames from "classnames";
import { FC, SVGProps } from "react";

export interface SpinnerProps extends SVGProps<SVGSVGElement> {}

export const Spinner: FC<SpinnerProps> = (props) => {
  return (
    <span role="progressbar">
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={classNames({
          "animate-spin": true,
          "h-6 w-6":
            !props.className?.includes("h-") &&
            !props.className?.includes("w-"),
          [String(props.className)]: Boolean(props.className),
        })}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75 fill-current"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  );
};

export default Spinner;
