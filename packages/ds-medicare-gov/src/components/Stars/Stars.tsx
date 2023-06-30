import React from 'react';
import { FunctionComponent } from 'react';
import { RoundedStarIcon } from '../Icons';

export interface StarsProps {
  /**
   * Describes the number of stars to be filled in (in .5 increments)
   */
  number: number;
  /**
   * Describes the total number of stars to be displayed.
   */
  total?: number;
  /**
   * Describes if the stars should be hidden from a screen reader.
   */
  ariaHidden?: boolean;
}

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/stars/?theme=medicare).
 */
const Stars: FunctionComponent<StarsProps> = ({
  number,
  total,
  ariaHidden = false,
}: StarsProps) => {
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
