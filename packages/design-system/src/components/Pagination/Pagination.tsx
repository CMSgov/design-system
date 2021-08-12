// import Ellipses from './Ellipses';
// import Page from './Page';
import React, {useState} from 'react';
import classNames from 'classnames';

export interface PaginationProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  compact: boolean;
}

// const getVisiblePages = (overflow, currentPage, totalPages): number[] => {
//     const visiblePages = [];
//     let start = currentPage - overflow;
//     let end = currentPage + overflow;

//     if (start < 1) {
//         start = 1;
//         end = start + overflow * 2;
//     }

//     if (end > totalPages) {
//         start = totalPages - overflow * 2;
//         end = totalPages;
//     }

//     if (overflow * 2 + 1 > totalPages) {
//         start = 1;
//         end = totalPages;
//     }

//     for (let i = start; i <= end; i++) {
//         visiblePages.push(i);
//     }

//     return visiblePages;
// }

export default function Pagination({totalPages, compact = false}) {
  const [currentPage, setCurrentPage] = useState(1);
  // const visiblePages = getVisiblePages(overflow, currentPage, totalPages);
  // const pages = [];

  // if (visiblePages[0] >= 2) {
  //     pages.push(
  //         <Page key="page-1" index={1} currentPage={currentPage} onChange={onChange} />
  //     );

  //     if (visiblePages[0] !== 2) {
  //         pages.push(<Ellipses key="ellipses-1" />)
  //     }
  // }

  // visiblePages.map(page => {
  //     pages.push(
  //         <Page key={`page-${page}`} index={page} currentPage={currentPage} onChange={onChange} />
  //     )
  // });

  // if (currentPage <= totalPages - overflow && visiblePages.length < totalPages) {
  //     if (currentPage < totalPages - overflow - 1) {
  //         pages.push(<Ellipses key="ellipses-2" />);
  //     }

  //     pages.push(
  //         <Page key={`page-${totalPages}`} className={linkClassName} index={totalPages} currentPage={currentPage} onChange={onChange} />
  //     );
  // }

  // 1. Wire up total pages
  // 2. Wire up next/prev functionality (Should they be buttons? Links don't have disabled states and these nav buttons aren't actually changing the url, they're interacting with links that do)
  //    a. Starts on 1
  //    b. Press next places focus style on 2, announces page 2 (politely), changes url
  //    c. Press prev places focus on style 1, announces page 1 (politely), changes url
  //    d. On page 1, prev is hidden
  //    e. On last page, next is hidden

  return (
    <nav className="ds-c-pagination" role="navigation" aria-label="Pagination Navigation">
      
      {/* Renders Next if `currentPage` > 1 */}
      {/* TODO: Use onClick to change URL */}
      {
        currentPage > 1 && (
          <a onClick={() => setCurrentPage(currentPage - 1)} className="ds-c-button ds-c-button--transparent nav" href="#" aria-label="Previous page">
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
        )
      }

      {compact ? (
          <span className="ds-c-pagination__page-count">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
      ) : (
        <ol>
          <li>
            <a className="ds-c-button ds-c-button--transparent" href="#" aria-label="Page 1">
              1
            </a>
          </li>
          <li>
            <span className="ds-c-pagination__overflow">&#8230;</span>
          </li>
          <li>
            <a className="ds-c-button ds-c-button--transparent" href="#" aria-label="Page 7">
              7
            </a>
          </li>
          <li>
            <span
              className="ds-c-button ds-c-button--transparent ds-c-pagination__current-page"
              aria-label="Current Page, Page 8"
              aria-current="true"
            >
              8
            </span>
          </li>
          <li>
            <a className="ds-c-button ds-c-button--transparent" href="#" aria-label="Page 9">
              9
            </a>
          </li>
          <li>
            <span className="ds-c-pagination__overflow">&#8230;</span>
          </li>
          <li>
            <a className="ds-c-button ds-c-button--transparent" href="#" aria-label="Page 25">
              25
            </a>
          </li>
        </ol>
      )}

      {/* Renders Next if `currentPage` < `totalPages` */}
      {/* TODO: Use onClick to change URL */}
      {
        currentPage < totalPages && (
          <a onClick={() => setCurrentPage(currentPage + 1)} className="ds-c-button ds-c-button--transparent" href="#" aria-label="Next page">
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
        )
      }
    </nav>
  );
}
