import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Pagination currentPage={1} totalPages={3} customUrl="http://www.example.com" />
    <Pagination currentPage={2} totalPages={5} />
    <Pagination currentPage={3} totalPages={5} />
    <Pagination currentPage={4} totalPages={5} />
    <Pagination currentPage={5} totalPages={5} compact />
    <Pagination currentPage={1} totalPages={6} />
    <Pagination currentPage={6} totalPages={6} />
    <Pagination currentPage={49} totalPages={50} />
    <Pagination currentPage={2} totalPages={50} />
  </div>,
  document.getElementById('js-example')
);
