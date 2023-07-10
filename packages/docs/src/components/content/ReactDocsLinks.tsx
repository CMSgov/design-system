import React, { Children } from 'react';
import humanizeList from 'humanize-react';

interface ReactDocsLinksProps {
  children: React.ReactElement<any>;
  theme: string;
}

const ReactDocsLinks = ({ children }: ReactDocsLinksProps) => {
  const links = Children.toArray(children);
  const formattedLinks = humanizeList(links, { conjunction: 'and' });

  return <p>See {formattedLinks} for React documentation.</p>;
};

export default ReactDocsLinks;
