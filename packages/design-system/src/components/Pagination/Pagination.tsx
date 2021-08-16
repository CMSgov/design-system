import Ellipses from './Ellipses'
import Page from './Page'
import React from 'react'

function paginationBuilder(currentPage, totalPages) {
  const range = [];
  const overflow = 1;

  let start = currentPage - overflow;
  let end = currentPage + overflow;

  /**
   * If `currentPage` = 1, only add first three pages to `range[]`
   */
  if (start < 1) {
    start = 1;
    end = start + overflow * 2; // 3
  }

  /**
   * If `end` > `totalPages`, only add last three pages to `range[]`
   */
  if (end > totalPages) {
    start = totalPages - overflow * 2; 
    end = totalPages;
  }

  /**
   * If `totalPages` is 5 or fewer, all pages added to `range[]`
   */
  if (totalPages <= 5) {
    start = 1;
    end = totalPages;
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  
  return range;
}

export default function Pagination({compact, url = 'www.example.com', currentPage, totalPages}): React.ReactNode {
  const overflow = 1;
  const pageRange = paginationBuilder(currentPage, totalPages)
  const pages = [];

  if (pageRange[0] >= 2) {
    /**
     * If `pageRange` begins with a page of 2 or greater,
     * begin Pagination with Page 1 
     */
    pages.push(
      <Page
        key="page-1"
        index={1}
        currentPage={currentPage}
      />
    )

    /**
     * If `pageRange` doesn't equal 2, second Pagination element is Ellipses,
     * otherwise page count continues.
     */
    if (pageRange[0] !== 2) {
      pages.push(<Ellipses key="ellipses-1" />)
    }
  }

  /**
   * Renders all Page components in range (3 pages) to Pagination component.
   */ 
  pageRange.map(page => {
    pages.push(
      <Page
        key={`page-${page}`}
        index={page}
        currentPage={currentPage}
      />
    )
  });

  /**
   * Defines if/when the Ellipses component appears
   * at the end of the Pagination component - 
   * as long as there are fewer than 5 pages.
   */
  if (currentPage <= totalPages - overflow - 1 && totalPages > 5) {
    if (currentPage < totalPages - overflow - 1) {
      pages.push(<Ellipses key="ellipses-2" />)
    }

    pages.push(
      <Page
        key={`page-${totalPages}`}
        index={totalPages}
        currentPage={currentPage}
      />
    )
  }

  // TODO: Add href logic
  // TODO: Add onClick logic
  // TODO: Test a11y

  return (
    <nav 
      className="ds-c-pagination" 
      role="navigation" 
      aria-label="Pagination Navigation"
    >
      <a 
        className="ds-c-button ds-c-button--transparent nav" 
        href={url} 
        aria-label="Previous page"
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
        Previous
      </a>
      { compact ? (
        <span className="ds-c-pagination__page-count">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      ) : (
        <ol>
          {pages}
        </ol>
      )
      }
      <a 
        className="ds-c-button ds-c-button--transparent" 
        href={url} 
        aria-label="Next page"
      >
        Next
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
      </a>
    </nav>
  )
}
