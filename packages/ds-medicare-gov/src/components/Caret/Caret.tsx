import React, { FunctionComponent } from "react";

interface CaretProps {
  className?: string;
  up?: boolean;
  left?: boolean;
  right?: boolean;
}

const Caret: FunctionComponent<CaretProps> = ({
  /* class name */
  className,
  up,
  left,
  right,
}) => {
  let transform = "translate(-2.000000, -5.000000)";
  if (up) {
    transform = "scale(1, -1) translate(-2.000000, -14.000000)";
  } else if (left) {
    transform = "rotate(90) translate(-5.000000, -20.000000)";
  } else if (right) {
    transform = "rotate(-90) translate(-14.000000, -5.000000)";
  }

  return (
    <svg
      width="15px"
      height="9px"
      viewBox="0 0 15 9"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <title>Caret</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform={transform}
          fill="#323A45"
          fillRule="nonzero"
          className="apply-fill caret-arrow"
        >
          <path d="M9.00581395,13.754 L2.26162791,6.686 C1.98837209,6.404 1.98837209,5.948 2.26162791,5.666 L2.6744186,5.24 C2.94767442,4.958 3.38953488,4.958 3.6627907,5.24 L9.5,11.378 L15.3372093,5.246 C15.6104651,4.964 16.0523256,4.964 16.3255814,5.246 L16.7383721,5.672 C17.0116279,5.954 17.0116279,6.41 16.7383721,6.692 L9.99418605,13.76 C9.72093023,14.036 9.27906977,14.036 9.00581395,13.754 Z"></path>
        </g>
      </g>
    </svg>
  );
};

export default Caret;
