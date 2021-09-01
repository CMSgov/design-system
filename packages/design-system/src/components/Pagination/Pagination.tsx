import Button from '../Button/Button';
import Ellipses from './Ellipses';
import Page from './Page';
import React from 'react';
import classNames from 'classnames';

export interface PaginationProps {
  /**
   * Class to be applied to parent `<nav>` element of Pagination component. Optional.
   */
  className?: string;
  /**
   * Renders compact layout. Optional.
   */
  compact?: boolean;
  /**
   * Defines active page in Pagination. Optional.
   */
  currentPage: number;
  /**
   * Sets a custom url for Pagination links. Optional.
   */
  customUrl?: string;
  /**
   * A callback function used to handle state changes.
   */
  onPageChange: (evt: React.MouseEvent, page: number) => void;
  /**
   * Sets custom label on left navigation. Optional.
   */
  leftLabel?: string;
  /**
   * Sets custom label on right navigation. Optional.
   */
  rightLabel?: string;
  /**
   * Sets total number of pages in Pagination component.
   */
  totalPages: number;
}

// Determines number of pages visible to either side of active page.
const overflow = 1;

// Determines total number of visible pages without Ellipses.
const maxVisiblePages = 7;

function paginationBuilder(page: number, pages: number): number[] {
  const paginationRange = [];

  let start = page - overflow;
  let end = page + overflow;

  const availableSlots = maxVisiblePages - 2;

  /**
   * If the current page is < `maxVisiblePages`,
   * add 1 - 5 pages.
   */
  if (page < availableSlots) {
    start = 1;
    end = availableSlots;
  }

  /**
   * If the current page equals `pages` - 1,
   * make sure `start` begins one page earlier.
   */
  if (page === pages - 2) {
    start -= 1;
    end += 1;
  }

  /**
   * If `end` page is two from the end,
   * make sure the last page shows instead of ellipsis.
   */
  if (end === pages - 2) {
    end += 1;
  }

  /**
   * If `end` > `pages`,
   * add last pages to `paginationRange[]`.
   */
  if (end >= pages) {
    start = pages - (availableSlots - 1);
    end = pages;
  }

  /**
   * If `pages` is 5 or fewer,
   * all pages added to `paginationRange[]`
   */
  if (pages <= maxVisiblePages) {
    start = 1;
    end = pages;
  }

  for (let i = start; i <= end; i++) {
    paginationRange.push(i);
  }

  return paginationRange;
}

function Pagination({
  className,
  compact,
  currentPage,
  customUrl,
  onPageChange,
  leftLabel,
  rightLabel,
  totalPages,
}: PaginationProps): React.ReactElement {
  const classes = classNames('ds-c-pagination', className);

  /**
   * `useState` and `useEffect` determine if
   * mobile layout of component is rendered.
   */

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    // Mobile media query derived from: https://design.cms.gov/guidelines/responsive/
    const media = window.matchMedia('(max-width: 543px)');
    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }
    const listener = () => {
      setIsMobile(media.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [isMobile]);

  const pageChange = React.useCallback(
    (page) => (evt: React.MouseEvent) => onPageChange(evt, page),
    [onPageChange]
  );

  const pages = [];

  /**
   * If `compact` or `isMobile` is true,
   * don't run code to populate `pages[]`.
   */
  if (!compact || !isMobile) {
    const pageRange = paginationBuilder(currentPage, totalPages);

    if (pageRange[0] >= 2) {
      /**
       * If `pageRange` begins with a page of 2 or greater,
       * begin Pagination with Page 1
       */
      pages.push(
        <Page
          customUrl={customUrl}
          key="page-1"
          index={1}
          isActive={currentPage === 1}
          onPageChange={pageChange(1)}
        />
      );

      /**
       * If `pageRange` doesn't equal 2, second Pagination element is Ellipses,
       * otherwise page count continues.
       */
      if (pageRange[0] !== 2) {
        pages.push(<Ellipses key="ellipses-1" />);
      }
    }

    /**
     * Renders all Page components in range (3 pages) to Pagination component.
     */

    pageRange.map((page) => {
      pages.push(
        <Page
          customUrl={customUrl}
          key={`page-${page}`}
          index={page}
          isActive={currentPage === page}
          onPageChange={pageChange(page)}
        />
      );
    });

    /**
     * Defines if/when the Ellipses component appears
     * at the end of the Pagination component -
     * as long as there are fewer than 7 pages.
     */
    if (currentPage <= totalPages - 3 && totalPages > maxVisiblePages) {
      if (currentPage < totalPages - 3) {
        pages.push(<Ellipses key="ellipses-2" />);
      }

      pages.push(
        <Page
          customUrl={customUrl}
          key={`page-${totalPages}`}
          index={totalPages}
          isActive={currentPage === totalPages}
          onPageChange={pageChange(totalPages)}
        />
      );
    }
  }

  return (
    <nav className={classes} role="navigation" aria-label="Pagination Navigation">
      {currentPage !== 1 && (
        <Button
          variation="tertiary"
          href={customUrl ? `${customUrl}/${currentPage - 1}` : `#${currentPage - 1}`}
          onClick={pageChange(currentPage - 1)}
        >
          <span className="ds-c-pagination__nav--previous-img-container">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-left"
              className="ds-c-pagination__nav--image"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
              />
            </svg>
          </span>
          {leftLabel}
        </Button>
      )}

      {isMobile || compact ? (
        <span className="ds-c-pagination__page-count">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          <span
            className="sr-only"
            aria-live="assertive"
            aria-label={`on page ${currentPage} of ${totalPages}`}
          />
        </span>
      ) : (
        <ol>{pages}</ol>
      )}

      {currentPage !== totalPages && (
        <Button
          variation="tertiary"
          href={customUrl ? `${customUrl}/${currentPage + 1}` : `#${currentPage + 1}`}
          onClick={pageChange(currentPage + 1)}
        >
          {rightLabel}
          <span className="ds-c-pagination__nav--next-img-container">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-right"
              className="ds-c-pagination__nav--image"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </span>
        </Button>
      )}
    </nav>
  );
}

Pagination.defaultProps = {
  compact: false,
  currentPage: 1,
  leftLabel: 'Previous',
  rightLabel: 'Next',
};

export default Pagination;
