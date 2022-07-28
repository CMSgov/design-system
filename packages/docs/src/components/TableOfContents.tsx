import React from 'react';
import { Link } from 'gatsby';
import { TableOfContentsItem } from '../helpers/graphQLTypes';

export interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

const TableOfContentsList = ({ items }: TableOfContentsProps) => {
  return (
    <ul className="c-table-of-contents__list ds-u-padding-left--2 ds-u-padding-right--0">
      {items.map((item) => (
        <li key={item.title} className="c-table-of-contents__list-item">
          <Link to={item.url}>{item.title}</Link>
          {item.items && <TableOfContentsList items={item.items} />}
        </li>
      ))}
    </ul>
  );
};

/**
 * The Desktop version of the table of contents
 */
const TableOfContents = ({ items }: TableOfContentsProps) => {
  return items.length ? (
    <div className="c-table-of-contents">
      <h2 className="c-table-of-contents__heading ds-u-margin-top--0 ds-u-margin-bottom--1 ds-u-font-size--base">
        On this page{' '}
      </h2>
      <TableOfContentsList items={items} />
    </div>
  ) : null;
};

export default TableOfContents;
