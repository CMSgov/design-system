import React from 'react';
import { FrontmatterInterface } from '../helpers/graphQLTypes';
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
   * current frontmatter to get current page information
   */
  frontmatter?: FrontmatterInterface;
}

type TableOfContentsFeedbackProps = Pick<TableOfContentsProps, 'frontmatter'>;

export const TableOfContentsList = ({ items, level, className = '' }: TableOfContentsProps) => {
  const itemClasses =
    level == 1
      ? 'c-table-of-contents__list-item c-table-of-contents__list-item--no-marker'
      : 'c-table-of-contents__list-item';

  return (
    <ul className={`c-table-of-contents__list ${className}`}>
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
export const TableOfContentsFeedback = ({ frontmatter }: TableOfContentsFeedbackProps) => {
  const { title, core } = frontmatter;
  const githubDiscussionLink = core?.githubDiscussionLink || null;

  return (
    <>
      <h2 className="c-table-of-contents__heading ds-u-margin-top--0 ds-u-margin-bottom--1 ds-u-font-size--base">
        Have Ideas?
      </h2>
      <ul className="ds-c-list--bare ds-u-md-margin-y--2">
        {githubDiscussionLink && (
          <li
            key="discussion-link"
            className="c-table-of-contents__list-item c-table-of-contents__list-item--no-marker"
          >
            <a href={'https://github.com/CMSgov/' + githubDiscussionLink}>
              Join in the discussion for &apos;{title}&apos;
            </a>
          </li>
        )}
        <li
          key="feedback-link"
          className="c-table-of-contents__list-item c-table-of-contents__list-item--no-marker"
        >
          <a href="/feedback">Propose a change.</a>
        </li>
      </ul>
    </>
  );
};

/**
 * The Desktop version of the table of contents
 */
const TableOfContents = ({ items, frontmatter }: TableOfContentsProps) => {
  const level = 1;
  return items.length ? (
    <div className="c-table-of-contents">
      <h2 className="c-table-of-contents__heading ds-u-margin-top--0 ds-u-margin-bottom--1 ds-u-font-size--base">
        On this page
      </h2>
      <TableOfContentsList items={items} level={level} />
      <TableOfContentsFeedback frontmatter={frontmatter} />
    </div>
  ) : null;
};

export default TableOfContents;
