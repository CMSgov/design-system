import React from 'react'

export interface PageProps {
  isActive: boolean,
  index: number,
  onPageChange: (e : React.MouseEvent) => void,
  customUrl?: string,
}

export default function Page({ index, isActive, customUrl, onPageChange } : PageProps) : React.ReactElement {
  return (
    <li>
      { isActive ? (
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
          onClick={onPageChange}
        >
          {index}
        </a>
      )
      }
    </li>
  )
}
