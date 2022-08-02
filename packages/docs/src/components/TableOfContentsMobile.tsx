import React from 'react';
import { Accordion, AccordionItem } from '@cmsgov/design-system';
import { TableOfContentsProps, TableOfContentsList } from './TableOfContents';

/**
 * The mobile version of the table of contents
 */
const TableOfContentsMobile = ({ items, title }: TableOfContentsProps) => {
  return items.length ? (
    <Accordion className="c-table-of-contents-mobile">
      <AccordionItem heading="On this page">
        <TableOfContentsList items={items} level={1} className="c-table-of-contents-mobile__list" />
        <h2 className="c-table-of-contents__heading ds-u-margin-y--0 ds-u-margin-top--3 ds-u-font-size--base">
          Have ideas?{' '}
        </h2>
        <ul role="list" className="ds-c-list--bare ds-u-md-margin-y--2">
          <li>
            <a href="/not-in-sidebar/feedback">Propose a change</a>
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  ) : null;
};

export default TableOfContentsMobile;
