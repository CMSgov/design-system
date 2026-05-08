import type * as React from 'react';
import { humanizeList } from '../../helpers/humanizeList';

interface StorybookDocLinksProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
  theme: string;
  tech?: 'react' | 'wc';
}

const StorybookDocLinks = ({ children, tech = 'react' }: StorybookDocLinksProps) => {
  const links = Array.isArray(children) ? children : [children];
  const formattedLinks = humanizeList(links, { conjunction: 'and' });

  return (
    <p>
      See {formattedLinks} for {tech === 'react' ? 'React' : 'Web Component'} documentation.
    </p>
  );
};

export default StorybookDocLinks;
