import React from 'react';
import { Link } from 'gatsby';
import { Accordion, AccordionItem } from '@cmsgov/design-system';
import { TableOfContentsProps } from './TableOfContents';

/**
 * The mobile version of the table of contents
 */
const TableOfContentsMobile = ({ data }: TableOfContentsProps) => {
  return (
    <Accordion className="c-table-of-contents-mobile">
      <AccordionItem heading="On this page">
        <ul className="c-table-of-contents-mobile__list">
          {data.map((dataItem) => (
            <li key={dataItem.title}>
              <Link to={dataItem.url}>{dataItem.title}</Link>
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};

export default TableOfContentsMobile;
