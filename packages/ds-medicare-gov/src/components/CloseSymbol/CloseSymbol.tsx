import React, { FunctionComponent } from "react";

interface CloseProps {
  className?: string;
}

const Close: FunctionComponent<CloseProps> = ({ className }) => {
  return (
    <svg
      width="14px"
      height="14px"
      viewBox="0 0 14 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <title>Close</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-5.000000, -5.000000)"
          fill="#323A45"
          fillRule="nonzero"
          className="apply-fill"
        >
          <path d="M13.6002309,12 L18.8575552,6.74267571 C19.0474816,6.55274931 19.0474816,6.24563429 18.8575552,6.05570789 L17.9442921,5.1424448 C17.7543657,4.9525184 17.4472507,4.9525184 17.2573243,5.1424448 L12,10.3997691 L6.74267571,5.1424448 C6.55274931,4.9525184 6.24563429,4.9525184 6.05570789,5.1424448 L5.1424448,6.05570789 C4.9525184,6.24563429 4.9525184,6.55274931 5.1424448,6.74267571 L10.3997691,12 L5.1424448,17.2573243 C4.9525184,17.4472507 4.9525184,17.7543657 5.1424448,17.9442921 L6.05570789,18.8575552 C6.24563429,19.0474816 6.55274931,19.0474816 6.74267571,18.8575552 L12,13.6002309 L17.2573243,18.8575552 C17.4472507,19.0474816 17.7543657,19.0474816 17.9442921,18.8575552 L18.8575552,17.9442921 C19.0474816,17.7543657 19.0474816,17.4472507 18.8575552,17.2573243 L13.6002309,12 Z"></path>
        </g>
      </g>
    </svg>
  );
};

export default Close;
