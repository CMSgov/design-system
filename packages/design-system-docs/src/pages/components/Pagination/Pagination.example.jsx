import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Pagination page={1} totalPages={3} customUrl="http://www.example.com" />
    <Pagination page={2} totalPages={7} />
    <Pagination page={5} totalPages={7} />
    <Pagination page={6} totalPages={7} />
    <Pagination page={7} totalPages={7} compact />
    <Pagination page={1} totalPages={8} />
    <Pagination page={8} totalPages={8} />
    <Pagination page={49} totalPages={50} />
    <Pagination page={2} totalPages={50} />
  </div>,
  document.getElementById('js-example')
);
