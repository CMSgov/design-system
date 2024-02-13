import { Pagination } from '@cmsgov/design-system';
import React from 'react';

function PaginationExample() {
  return (
    <>
      <h2>Pagination Example</h2>
      <Pagination
        currentPage={5}
        totalPages={10}
        renderHref={(page) => `#/results/${page}`}
        onPageChange={(evt, page) => {
          evt.preventDefault();
          console.log(`Page ${page}`);
        }}
      />
    </>
  );
}

export default PaginationExample;
