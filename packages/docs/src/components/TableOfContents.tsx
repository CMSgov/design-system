import React from 'react';
import { Link } from 'gatsby';
import { TableOfContentsItem } from '../helpers/graphQLTypes';

interface TableOfContentsProps {
  data: TableOfContentsItem[];
}

/**
 * The Desktop version of the table of contents
 */
const TableOfContents = ({ data }: TableOfContentsProps) => {
  return (
    <div className="c-table-of-contents">
      <h2 className="c-table-of-contents__heading ds-u-margin-y--0 ds-u-font-size--base">
        On this page{' '}
      </h2>
      <ul className="c-table-of-contents__list ds-u-padding-left--0 ds-u-padding-right--0">
        {data.map((dataItem) => (
          <li key={dataItem.title} className="c-table-of-contents__list-item">
            <Link to={dataItem.url}>{dataItem.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
