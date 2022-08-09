import React from 'react';
import { TableOfContentsItem } from '../helpers/graphQLTypes';

export interface TableOfContentsProps {
  /**
   * table of contents data from graphql
   */
  items: TableOfContentsItem[];
  /**
   * Describes which level the list is at. Helps with styling
   */
  level?: number;
  /**
   * additional className string to append to the list
   */
  className?: string;
  /**
   * page title
   */
  title?: string;
}

export const TableOfContentsList = ({ items, level, className = '' }: TableOfContentsProps) => {
  const itemClasses =
    level == 1
      ? 'c-table-of-contents__list-item c-table-of-contents__list-item--no-marker'
      : 'c-table-of-contents__list-item';

  return (
    <ul role="list" className={`c-table-of-contents__list ds-u-padding-right--0 ${className}`}>
      {items.map((item) => (
        <li key={item.title} className={itemClasses}>
          <a href={item.url}>{item.title}</a>
          {item.items && <TableOfContentsList items={item.items} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
};

/*
 * Feedback section
 */
export const TableOfContentsFeedback = () => (
  <>
    <h2 className="c-table-of-contents__heading ds-u-margin-y--0 ds-u-md-margin-top--6 ds-u-font-size--base">
      Have ideas?{' '}
    </h2>
    <ul role="list" className="ds-c-list ds-c-list--bare ds-u-md-margin-y--2">
      <li>
        <a href="/feedback">Propose a change</a>
      </li>
      <li>
        <a href="https://github.com/CMSgov/design-system/discussions">Join in the discussion</a>
      </li>
    </ul>
  </>
);

/**
 * The Desktop version of the table of contents
 */
const TableOfContents = ({ items }: TableOfContentsProps) => {
  const level = 1;
  return items.length ? (
    <div className="c-table-of-contents">
      <h2 className="c-table-of-contents__heading ds-u-margin-top--0 ds-u-margin-bottom--1 ds-u-font-size--base">
        On this page{' '}
      </h2>
      <TableOfContentsList items={items} level={level} />
      <TableOfContentsFeedback />
    </div>
  ) : null;
};

export default TableOfContents;
