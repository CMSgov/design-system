import React, { FunctionComponent } from 'react';
import { RoundedStarIcon } from '../Icons';

interface StarsProps {
  number: number;
  total?: number;
  ariaHidden?: boolean;
}

const Stars: FunctionComponent<StarsProps> = ({ number, total, ariaHidden = false }) => {
  const totalStars = total && number < 11 ? Math.ceil(total) : 5;
  const completeStars = Math.floor(number); // 3.5 -> 3
  const halfStar = number - completeStars !== 0; // 3.5 - 3 = 0.5, so half star exists
  const emptyStars = totalStars - completeStars - (halfStar ? 1 : 0);

  const starIcons = [];
  let starIndex = 0;
  for (let i = 0; i < completeStars; i++) {
    starIcons.push(<RoundedStarIcon variation="filled" key={starIndex} />);
    starIndex++;
  }

  if (halfStar) {
    starIcons.push(<RoundedStarIcon variation="half" key={starIndex} />);
    starIndex++;
  }

  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(<RoundedStarIcon key={starIndex} />);
    starIndex++;
  }

  return (
    <span aria-hidden={ariaHidden} className="ds-u-display--flex ds-u-flex-wrap--nowrap">
      {starIcons}
    </span>
  );
};

export default Stars;
