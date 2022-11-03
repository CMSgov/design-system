import humanizeList from 'humanize-react';
import { TableRow, TableCell } from '@cmsgov/design-system';

export interface PropTableHtmlElementRowProps {
  /**
   * List of element names
   */
  elements: string[];
}

/**
 * If the component we're documenting passes extra props through to an HTML element,
 * we want to include documentation about that. Rather than listing out all the
 * additional attributes for those HTML elements in our props table, we will add
 * some explanatory text with MDN documentation links to the bottom of our props
 * table.
 */
const PropsTableHtmlElementRow = ({ elements }: PropTableHtmlElementRowProps) => {
  const elementLinks = elements.map((name) => (
    <a href={`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${name}`} key={name}>
      {`<${name}>`}
    </a>
  ));
  const formattedElementLinks = humanizeList(elementLinks, { conjunction: 'or' });

  return (
    <TableRow>
      <TableCell colSpan={4}>
        This component passes any additional props to its underlying {formattedElementLinks} element
        as attributes. It will accept any props that are valid attributes of {formattedElementLinks}
        .
      </TableCell>
    </TableRow>
  );
};

export default PropsTableHtmlElementRow;
