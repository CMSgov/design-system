import { TableOfContentsItem } from '../../helpers/graphQLTypes';

function cleanTitle(title: string) {
  return title.replace(/<[^>]*>/g, '');
}

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
  /**
   * page slug
   */
  slug?: string;
}

export type TableOfContentsFeedbackProps = Pick<TableOfContentsProps, 'slug'>;

export const TableOfContentsList = ({ items, level, className = '' }: TableOfContentsProps) => {
  const itemClasses =
    level == 1
      ? 'c-table-of-contents__list-item c-table-of-contents__list-item--no-marker'
      : 'c-table-of-contents__list-item';

  return (
    <ul role="list" className={`c-table-of-contents__list ds-u-padding-right--0 ${className}`}>
      {items.map((item) => (
        <li key={item.title} className={itemClasses}>
          <a href={item.url}>{cleanTitle(item.title)}</a>
          {item.items && <TableOfContentsList items={item.items} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
};

/*
 * Feedback section
 */
export const TableOfContentsFeedback = ({ slug }: TableOfContentsFeedbackProps) => (
  <>
    <h2 className="c-table-of-contents__heading ds-u-margin-y--0 ds-u-md-margin-top--6 ds-u-font-size--base">
      Have ideas?{' '}
    </h2>
    <ul role="list" className="ds-c-list ds-c-list--bare ds-u-md-margin-y--2">
      <li>
        <a href="/contact">Contact the team</a>
      </li>
      <li>
        <a href="https://github.com/CMSgov/design-system/discussions">
          Start a discussion on GitHub
        </a>
      </li>
      {typeof slug !== 'undefined' ? (
        <li>
          <a
            href={`https://github.com/CMSgov/design-system/edit/main/packages/docs/content/${slug}.mdx`}
          >
            Edit this page
          </a>
        </li>
      ) : null}
    </ul>
  </>
);

/**
 * The Desktop version of the table of contents
 */
const TableOfContents = ({ items, slug }: TableOfContentsProps) => {
  const level = 1;
  return items.length ? (
    <div className="c-table-of-contents">
      <h2 className="c-table-of-contents__heading ds-u-margin-top--0 ds-u-margin-bottom--1 ds-u-font-size--base">
        On this page{' '}
      </h2>
      <TableOfContentsList items={items} level={level} />
      <TableOfContentsFeedback slug={slug} />
    </div>
  ) : null;
};

export default TableOfContents;
