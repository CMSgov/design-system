import React, { FunctionComponent } from 'react';
import { ArrowIcon } from '@cmsgov/design-system';
import { ArrowIconDirectionType } from '@cmsgov/design-system/dist/components/Icons/ArrowIcon';

interface CaretProps {
  className?: string;
  up?: boolean;
  left?: boolean;
  right?: boolean;
}

const Caret: FunctionComponent<CaretProps> = ({ className, up, left, right }) => {
  console.error(
    `[Deprecated]: Please use the <ArrowIcon /> component instead. This component will be removed in a future release.`
  );

  let direction: ArrowIconDirectionType = 'down';
  if (up) {
    direction = 'up';
  } else if (left) {
    direction = 'left';
  } else if (right) {
    direction = 'right';
  }

  return <ArrowIcon title="Caret" className={className} direction={direction} />;
};

export default Caret;
