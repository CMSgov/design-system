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
    <hgroup className="c-page-header ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-top--2">
      <h1 className="ds-text-heading--4xl">{title}</h1>
      {intro && (
        <p className="ds-u-font-size--lg ds-u-margin-top--1 ds-u-margin-bottom--1">{intro}</p>
      )}
    </hgroup>
  );
};

export default PageHeader;
