import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../State/State'

ReactDOM.render(
  <div className="example--wrapper">
    <Pagination page={1} totalPages={3} customUrl="http://www.example.com" />
    
    <State default={5}>
      {([page, setPage]) => {
        const totalPages = 10
        const onPageChange = (e, page) => {
          e.preventDefault()
          setPage(page)
        }
        return (
          <>
          <span>Current page: {page} / {totalPages}</span>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
          </>
        )
      }}
    </State>
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
