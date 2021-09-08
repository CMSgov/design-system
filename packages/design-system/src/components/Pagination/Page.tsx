import Button from '../Button/Button';
import React from 'react';

export interface PageProps {
  /**
   * Sets a custom url for links. Optional.
   */
  customUrl?: string;
  /**
   * Defines the page number.
   */
  index: number;
  /**
   * Renders current page if true, other links if false.
   */
  isActive: boolean;
  /**
   * A callback function used to handle state changes.
   */
  onPageChange?: (evt: React.MouseEvent) => void;
}

export default function Page({
  customUrl,
  index,
  isActive,
  onPageChange,
}: PageProps): React.ReactElement {
  return (
    <li>
      {isActive ? (
        <span
          className="ds-c-button ds-c-button--transparent ds-c-pagination__current-page"
          aria-current="true"
        >
          {index}
        </span>
      ) : (
        <Button
          variation="transparent"
          href={customUrl ? `${customUrl}/${index}` : `#${index}`}
          onClick={onPageChange}
          aria-label={`page ${index}`}
        >
          {index}
        </Button>
      )}
    </li>
  );
}
