import React from 'react'

export default function Page({index, currentPage, customUrl}) {
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
          href={ customUrl ? `${customUrl}/${index}` : `#${index}` } 
          aria-label={`page ${index}`}
        >
          {index}
        </a>
      )
      }
    </li>
  )
}
