import React from 'react';
import Button from '../Button/Button';
import Ellipses from './Ellipses';
import Page from './Page';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ArrowIcon } from '../Icons';
import { t } from '../i18n';

export interface PaginationProps {
  /**
   * Defines `aria-label` on wrapping Pagination element. Since this exists on a `<nav>` element, the word "navigation" should be omitted from this label. Optional.
   */
  ariaLabel?: string;
  /**
   * Class to be applied to parent `<nav>` element of Pagination component. Optional.
   */
  className?: string;
  /**
   * Renders compact layout. Optional.
   */
  compact?: boolean;
  /**
   * Defines active page in Pagination.
   */
  currentPage: number;
  /**
   * Determines if navigation is hidden when current page is the first or last of Pagination page set. Optional.
   */
  isNavigationHidden?: boolean;
  /**
   * A callback function used to handle state changes.
   */
  onPageChange: (evt: React.MouseEvent, page: number) => void;
  /**
   * Defines application-specific routing in url for links.
   */
  renderHref: (page: number) => string;
  /**
   * Sets custom label on start navigation. Added for language support. Optional.
   */
  startLabelText?: string;
  /**
   * Sets custom ARIA label on start navigation. Added for language support. Label structure should be the equivalent of: Previous Page. Optional.
   */
  startAriaLabel?: string;
  /**
   * Sets custom label on end navigation. Added for language support. Optional.
   */
  endLabelText?: string;
  /**
   * Sets custom ARIA label on end navigation. Added for language support. Label structure should be the equivalent of: Next Page. Optional.
   */
  endAriaLabel?: string;
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
  ariaLabel,
  className,
  compact,
  currentPage,
  renderHref,
  onPageChange,
  isNavigationHidden,
  startLabelText,
  startAriaLabel,
  endLabelText,
  endAriaLabel,
  totalPages,
  ...rest
}: PaginationProps): React.ReactElement {
  const classes = classNames('ds-c-pagination', { 'ds-c-pagination--compact': compact }, className);

  /**
   * `useState` and `useEffect` determine if
   * mobile layout of component is rendered.
   */

  const pageChange = useCallback(
    (page) => (evt: React.MouseEvent) => onPageChange(evt, page),
    [onPageChange]
  );

  const pages = [];

  /**
   * If `compact` is true, don't run code to populate `pages[]`.
   */
  if (!compact) {
    const pageRange = paginationBuilder(currentPage, totalPages);

    if (pageRange[0] >= 2) {
      /**
       * If `pageRange` begins with a page of 2 or greater,
       * begin Pagination with Page 1
       */
      pages.push(
        <Page
          href={renderHref(1)}
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
          href={renderHref(page)}
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
          href={renderHref(totalPages)}
          key={`page-${totalPages}`}
          index={totalPages}
          isActive={currentPage === totalPages}
          onPageChange={pageChange(totalPages)}
        />
      );
    }
  }

  const startIcon = <ArrowIcon direction="left" className="ds-c-pagination__nav--image" />;
  const endIcon = <ArrowIcon direction="right" className="ds-c-pagination__nav--image" />;

  return (
    <nav className={classes} aria-label={ariaLabel ?? t('pagination.ariaLabel')} {...rest}>
      {currentPage === 1 ? (
        <span
          className="ds-c-pagination__nav ds-c-pagination__nav--disabled"
          aria-disabled="true"
          style={{ visibility: isNavigationHidden ? 'hidden' : 'visible' }}
          aria-hidden={isNavigationHidden}
        >
          <span className="ds-c-pagination__nav--img-container ds-c-pagination__nav--img-container-previous">
            {startIcon}
          </span>
          {startLabelText ?? t('pagination.startLabelText')}
        </span>
      ) : (
        <Button
          variation="ghost"
          href={renderHref(currentPage - 1)}
          onClick={pageChange(currentPage - 1)}
          aria-label={startAriaLabel ?? t('pagination.startAriaLabel')}
          className="ds-c-pagination__nav"
        >
          <span className="ds-c-pagination__nav--img-container ds-c-pagination__nav--img-container-previous">
            {startIcon}
          </span>
          {startLabelText ?? t('pagination.startLabelText')}
        </Button>
      )}

      <span
        className="ds-c-pagination__page-count"
        dangerouslySetInnerHTML={{
          __html: t('pagination.pageXOfY', {
            number: `<strong>${currentPage}</strong>`,
            total: `<strong>${totalPages}</strong>`,
          }),
        }}
      />

      <ul role="list">{pages}</ul>

      {currentPage === totalPages ? (
        <span
          className="ds-c-pagination__nav ds-c-pagination__nav--disabled"
          style={{ visibility: isNavigationHidden ? 'hidden' : 'visible' }}
          aria-hidden={isNavigationHidden}
          aria-disabled="true"
        >
          {endLabelText ?? t('pagination.endLabelText')}
          <span className="ds-c-pagination__nav--img-container ds-c-pagination__nav--img-container-next">
            {endIcon}
          </span>
        </span>
      ) : (
        <Button
          variation="ghost"
          href={renderHref(currentPage + 1)}
          onClick={pageChange(currentPage + 1)}
          aria-label={endAriaLabel ?? t('pagination.endAriaLabel')}
          className="ds-c-pagination__nav"
        >
          {endLabelText ?? t('pagination.endLabelText')}
          <span className="ds-c-pagination__nav--img-container ds-c-pagination__nav--img-container-next">
            {endIcon}
          </span>
        </Button>
      )}
    </nav>
  );
}

Pagination.defaultProps = {
  compact: false,
  isNavigationHidden: false,
};

export default Pagination;
