import React from 'react';

interface ExampleFooterProps {
  /**
   * A link or something to render to the right of the code button(s)
   */
  sourceLink?: React.ReactElement;
}

/**
 * HTML code snippet. This component will prettify an html string and do syntax highlighting
 */
const ExampleFooter = ({ sourceLink }: ExampleFooterProps) => {
  return <div className="c-example-footer">{sourceLink}</div>;
};

export default ExampleFooter;
