import { Pagination } from '@cmsgov/ds-healthcare-gov';
import React from 'react';

function PaginationExample() {
  return (
    <div>
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
    </div>
  );
}

export default PaginationExample;
