import { Pagination } from '@cmsgov/design-system';
import React from 'react';

function PaginationExample(): React.ReactElement {
  return (
    <div>
      <h2>Pagination Example</h2>
      <Pagination currentPage={5} totalPages={10} />
    </div>
  );
}

export default PaginationExample;
