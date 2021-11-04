import React, { FunctionComponent } from "react";
import uniqueId from "lodash.uniqueid";

const EmptyStar: FunctionComponent = () => {
  const clipPath1 = uniqueId("empty_clip_path_");
  const clipPath2 = uniqueId("empty_clip_path_");
  const clipPath3 = uniqueId("empty_clip_path_");

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      focusable="false"
    >
      <clipPath id={clipPath1}>
        <path d="M11,3.6L8.8,8.3L3.9,9C3,9.2,2.7,10.3,3.3,10.9l3.6,3.6L6,19.7c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4l4.4,2.4 c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7L13,3.6C12.6,2.8,11.4,2.8,11,3.6z" />
      </clipPath>
      <clipPath id={clipPath2}>
        <rect x="-8" y="-8" width="40" height="40" />
      </clipPath>
      <clipPath id={clipPath3}>
        <rect x="3" y="3" width="18" height="18" />
      </clipPath>
      <g clipPath={`url(#${clipPath1})`}>
        <g
          clipPath={`url(#${clipPath2})`}
          fill="none"
          stroke="#1E3C70"
          strokeWidth={2}
          strokeMiterlimit={10}
        >
          <path
            className="EmptyStarPath"
            clipPath={`url(#${clipPath3})`}
            d="M11,3.6L8.8,8.3L3.9,9C3,9.2,2.7,10.3,3.3,10.9l3.6,3.6L6,19.7c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4l4.4,2.4 c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7L13,3.6C12.6,2.8,11.4,2.8,11,3.6z"
          />
        </g>
      </g>
    </svg>
  );
};

const HalfStar: FunctionComponent = () => {
  const clipPath1 = uniqueId("clip_path_");
  const clipPath2 = uniqueId("clip_path_");
  const clipPath3 = uniqueId("clip_path_");
  const filterId = uniqueId("star_filter_");
  const maskId = uniqueId("star_mask_");

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      focusable="false"
    >
      <title>Half Star</title>
      <g>
        <g>
          <clipPath id={clipPath1}>
            <path d="M11.5,3.6L9.3,8.3L4.4,9c-0.9,0.1-1.2,1.3-0.6,1.9l3.6,3.6l-0.8,5.1c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4 l4.4,2.4c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7l-2.2-4.7C13.1,2.8,11.9,2.8,11.5,3.6z" />
          </clipPath>
          <clipPath id={clipPath2}>
            <rect x="-7.5" y="-8" width="40" height="40" />
          </clipPath>
          <clipPath id={clipPath3}>
            <rect x="3.5" y="3" width="18" height="18" />
          </clipPath>
          <g clipPath={`url(#${clipPath1})`}>
            <g
              clipPath={`url(#${clipPath2})`}
              fill="none"
              stroke="#1E3C70"
              strokeWidth={2}
              strokeMiterlimit={10}
            >
              <path
                clipPath={`url(#${clipPath3})`}
                d="M11.5,3.6L9.3,8.3L4.4,9c-0.9,0.1-1.2,1.3-0.6,1.9l3.6,3.6l-0.8,5.1c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4 l4.4,2.4c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7l-2.2-4.7C13.1,2.8,11.9,2.8,11.5,3.6z"
              />
            </g>
          </g>
        </g>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x="3"
          y="3"
          width="19"
          height="18"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
        <mask
          maskUnits="userSpaceOnUse"
          x="3"
          y="3"
          width="19"
          height="18"
          id={maskId}
        >
          <g filter={`url(#${filterId})`}>
            <rect
              x="2"
              y="1"
              width="10.5"
              height="21"
              fill="#FFFFFF"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </mask>
        <path
          className="HalfStarPath"
          fill="#1E3C70"
          fillRule="evenodd"
          clipRule="evenodd"
          mask={`url(#${maskId})`}
          d="M11.5,3.6L9.2,8.3L4,9C3,9.2,2.7,10.3,3.3,10.9l3.8,3.6l-0.9,5.1c-0.2,0.9,0.8,1.6,1.6,1.2 l4.6-2.4 l4.6,2.4c0.8,0.4,1.8-0.3,1.6-1.2l-0.9-5.1l3.8-3.6C22.3,10.3,22,9.2,21,9l-5.2-0.7l-2.3-4.7C13.1,2.8,11.9,2.8,11.5,3.6z"
        />
      </g>
    </svg>
  );
};

const FilledStar: FunctionComponent = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      enableBackground="new 0 0 24 24"
      focusable="false"
    >
      <title>Filled Star</title>
      <g>
        <polygon
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#1E3C70"
          points="12.5,17.5 18.4,21 16.8,14.3 22,9.9 15.2,9.3 12.5,3 9.8,9.3 3,9.9 8.2,14.3 6.6,21"
        />
        <path
          className="FilledStarPath"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#1E3C70"
          d="M11.5,3.6L9.2,8.3L4,9C3,9.2,2.7,10.3,3.3,10.9l3.8,3.6l-0.9,5.1c-0.2,0.9,0.8,1.6,1.6,1.2
          l4.6-2.4l4.6,2.4c0.8,0.4,1.8-0.3,1.6-1.2l-0.9-5.1l3.8-3.6C22.3,10.3,22,9.2,21,9l-5.2-0.7l-2.3-4.7C13.1,2.8,11.9,2.8,11.5,3.6z"
        />
      </g>
    </svg>
  );
};

interface StarsProps {
  number: number;
  total?: number;
  ariaHidden?: boolean;
}

const Stars: FunctionComponent<StarsProps> = ({
  number,
  total,
  ariaHidden = false,
}) => {
  const totalStars = total && number < 11 ? Math.ceil(total) : 5;
  const completeStars = Math.floor(number); // 3.5 -> 3
  const halfStar = number - completeStars !== 0; // 3.5 - 3 = 0.5, so half star exists
  const emptyStars = totalStars - completeStars - (halfStar ? 1 : 0);

  const starIcons = [];
  let starIndex = 0;
  for (let i = 0; i < completeStars; i++) {
    starIcons.push(<FilledStar key={starIndex} />);
    starIndex++;
  }

  if (halfStar) {
    starIcons.push(<HalfStar key={starIndex} />);
    starIndex++;
  }

  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(<EmptyStar key={starIndex} />);
    starIndex++;
  }

  return (
    <span
      aria-hidden={ariaHidden}
      className="ds-u-display--flex ds-u-flex-wrap--nowrap"
    >
      {starIcons}
    </span>
  );
};

export default Stars;
