import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../State/State';

ReactDOM.render(
  <div className="example--wrapper">
    <h6 className="preview__label">Default pagination</h6>
    <State default={1}>
      {([page, setPage]) => {
        const totalPages = 15;
        const onPageChange = (evt, page) => {
          evt.preventDefault();
          setPage(page);
        };
        return (
          <>
            <span>
              Current page: {page} / {totalPages}
            </span>
            <Pagination
              id="test-default"
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              renderHref={(page) => `#/results/${page}`}
            />
          </>
        );
      }}
    </State>

    <h6 className="preview__label">Pagination with hidden navigation</h6>
    <State default={1}>
      {([page, setPage]) => {
        const totalPages = 15;
        const onPageChange = (evt, page) => {
          evt.preventDefault();
          setPage(page);
        };
        return (
          <>
            <span>
              Current page: {page} / {totalPages}
            </span>
            <Pagination
              id="test-hidden-nav"
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              renderHref={(page) => `#${page}`}
              isNavigationHidden
            />
          </>
        );
      }}
    </State>

    <h6 className="preview__label">Compact pagination</h6>
    <State default={1}>
      {([page, setPage]) => {
        const totalPages = 15;
        const onPageChange = (evt, page) => {
          evt.preventDefault();
          setPage(page);
        };
        return (
          <>
            <span>
              Current page: {page} / {totalPages}
            </span>
            <Pagination
              id="test-compact"
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              renderHref={(page) => `#/results?page=${page}`}
              compact
            />
          </>
        );
      }}
    </State>
  </div>,
  document.getElementById('js-example')
);
