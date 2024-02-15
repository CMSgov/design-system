import { Pagination } from '@cmsgov/design-system';
import React, { useState } from 'react';

function PaginationExample() {
  const [page, setPage] = useState(5);
  const totalPages = 10;
  return (
    <>
      <h2>Pagination Example</h2>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        renderHref={(page: number) => `#/results/${page}`}
        onPageChange={(evt: any, newPage: number) => {
          evt.preventDefault();
          setPage(newPage);
          console.log(`Page ${newPage}`);
        }}
      />
    </>
  );
}

export default PaginationExample;
