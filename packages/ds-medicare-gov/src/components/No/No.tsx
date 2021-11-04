import React, { FunctionComponent } from "react";

interface NoProps {
  className?: string;
}

const No: FunctionComponent<NoProps> = ({ className }) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <title>No</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M15.4118182,12 L20.5290341,6.88278409 C21.1569886,6.25482955 21.1569886,5.23670455 20.5290341,4.60823864 L19.3917614,3.47096591 C18.7638068,2.84301136 17.7456818,2.84301136 17.1172159,3.47096591 L12,8.58818182 L6.88278409,3.47096591 C6.25482955,2.84301136 5.23670455,2.84301136 4.60823864,3.47096591 L3.47096591,4.60823864 C2.84301136,5.23619318 2.84301136,6.25431818 3.47096591,6.88278409 L8.58818182,12 L3.47096591,17.1172159 C2.84301136,17.7451705 2.84301136,18.7632955 3.47096591,19.3917614 L4.60823864,20.5290341 C5.23619318,21.1569886 6.25482955,21.1569886 6.88278409,20.5290341 L12,15.4118182 L17.1172159,20.5290341 C17.7451705,21.1569886 18.7638068,21.1569886 19.3917614,20.5290341 L20.5290341,19.3917614 C21.1569886,18.7638068 21.1569886,17.7456818 20.5290341,17.1172159 L15.4118182,12 Z"
          fill="#B20000"
          className="apply-fill"
        ></path>
      </g>
    </svg>
  );
};

export default No;
