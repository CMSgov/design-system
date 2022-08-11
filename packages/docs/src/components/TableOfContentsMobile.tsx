import React from 'react';
import { Accordion, AccordionItem } from '@cmsgov/design-system';
import {
  TableOfContentsFeedback,
  TableOfContentsProps,
  TableOfContentsList,
} from './TableOfContents';

/**
 * The mobile version of the table of contents
 */
const TableOfContentsMobile = ({ items, slug }: TableOfContentsProps) => {
  return items.length ? (
    <Accordion className="c-table-of-contents-mobile">
      <AccordionItem heading="On this page">
        <TableOfContentsList items={items} level={1} className="c-table-of-contents-mobile__list" />
        <TableOfContentsFeedback slug={slug} />
      </AccordionItem>
    </Accordion>
  ) : null;
};

export default TableOfContentsMobile;
