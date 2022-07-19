import React from 'react';

import { Badge } from '@cmsgov/design-system';
import { FrontmatterInterface } from '../helpers/graphQLTypes';
import GithubIcon from './GithubIcon';

type PageHeaderProps = {
  frontmatter?: FrontmatterInterface;
};

const PageHeader = ({ frontmatter = { title: '' } }: PageHeaderProps) => {
  const { status, title } = frontmatter;

  return (
    <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block">
      <h1 className="ds-display">{title}</h1>
      <p>{}</p>
      <div>
        {status && (
          <Badge variation="warn" className="ds-u-margin-right--2 ds-u-text-transform--capitalize">
            {status}
          </Badge>
        )}
        <a href="" className="c-page-header__link">
          <GithubIcon />
          Github
        </a>
        <a href="" className="c-page-header__link">
          <img
            alt="Storybook logo"
            src={'/images/storybook-icon.png'}
            className="ds-u-display--inline c-page-header__icon"
          />
          Storybook
        </a>
        <a href="" className="c-page-header__link">
          <img
            alt="Sketch logo"
            src={'/images/sketch-icon.png'}
            className="ds-u-display--inline c-page-header__icon"
          />
          Sketch
        </a>
      </div>
    </header>
  );
};

export default PageHeader;
