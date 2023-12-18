import React from 'react';
import { FrontmatterInterface } from '../../helpers/graphQLTypes';

type PageHeaderProps = {
  frontmatter?: FrontmatterInterface;
  theme: string;
};

/**
 * Page header component that shows the page title and other details
 */
const PageHeader = ({ frontmatter = { title: '' }, theme }: PageHeaderProps) => {
  const { title, intro } = frontmatter;

  return (
    <hgroup className="c-page-header">
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </hgroup>
  );
};

export default PageHeader;
