import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../State/State'

ReactDOM.render(
  <div className="example--wrapper">
    <Pagination currentPage={1} totalPages={3} customUrl="http://www.example.com" />
    
    <State default={5}>
      {([page, setPage]) => {
        const totalPages = 10
        const onPageChange = (evt, page) => {
          evt.preventDefault()
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
    <Pagination currentPage={5} totalPages={7} />
    <Pagination currentPage={6} totalPages={7} />
    <Pagination currentPage={7} totalPages={7} compact />
    <Pagination currentPage={1} totalPages={8} />
    <Pagination currentPage={8} totalPages={8} />
    <Pagination currentPage={48} totalPages={50} />
    <Pagination currentPage={47} totalPages={50} />
    <Pagination currentPage={49} totalPages={50} />
    <Pagination currentPage={2} totalPages={50} />
  </div>,
  document.getElementById('js-example')
);
