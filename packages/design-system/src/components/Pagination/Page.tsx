import React from 'react'

export default function Page({index, currentPage}) {
  return (
    <li>
      { index === currentPage ? (
        <span
          className="ds-c-button ds-c-button--transparent ds-c-pagination__current-page"
          aria-label={`current page, page ${index}`}
          aria-current="true"
        >
          {index}
        </span>
      ) : (
        <a 
          className="ds-c-button ds-c-button--transparent" 
          href="www.example.com" 
          aria-label={`page ${index}`}
          onClick={(e) => console.log(e)}
        >
          {index}
        </a>
      )
      }
    </li>
  )
}
