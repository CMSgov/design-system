import { Pagination } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../State/State'

ReactDOM.render(
  <div className="example--wrapper">
    <Pagination currentPage={2} totalPages={15} onPageChange={(evt) => {evt.preventDefault()}} />
    
    <State default={1}>
      {([page, setPage]) => {
        const totalPages = 15
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

    <Pagination currentPage={2} totalPages={15} onPageChange={(evt) => {evt.preventDefault()}} customUrl="www.example.com" />
    
    <Pagination currentPage={2} totalPages={15} onPageChange={(evt) => {evt.preventDefault()}} compact />
  </div>,
  document.getElementById('js-example')
);
