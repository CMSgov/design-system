import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Pagination currentPage={5} totalPages={10} />
    <Pagination currentPage={5} totalPages={10} compact />
  </div>,
  document.getElementById('js-example')
);
