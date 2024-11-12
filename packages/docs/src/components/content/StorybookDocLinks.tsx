import { Children } from 'react';
import type * as React from 'react';
import humanizeList from 'humanize-react';

interface StorybookDocLinksProps {
  children: React.ReactElement<any>;
  theme: string;
  tech?: 'react' | 'wc';
}

const StorybookDocLinks = ({ children, tech = 'react' }: StorybookDocLinksProps) => {
  const links = Children.toArray(children);
  const formattedLinks = humanizeList(links, { conjunction: 'and' });

  return (
    <p>
      See {formattedLinks} for {tech === 'react' ? 'React' : 'Web Component'} documentation.
    </p>
  );
};

export default StorybookDocLinks;
