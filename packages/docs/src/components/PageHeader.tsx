import React from 'react';

import { Badge } from '@cmsgov/design-system';
import { FrontmatterInterface } from '../helpers/graphQLTypes';
import { makeGithubUrl, makeSketchUrl, makeStorybookUrl } from '../helpers/urlUtils';
import GithubIcon from './GithubIcon';

type PageHeaderProps = {
  frontmatter?: FrontmatterInterface;
  theme: string;
};

/**
 * Page header component that shows the page title and other details
 */
const PageHeader = ({ frontmatter = { title: '' }, theme }: PageHeaderProps) => {
  const { status, title, core, intro } = frontmatter;
  const themeLinks = frontmatter[theme];

  const ghPath = themeLinks?.githubLink || core?.githubLink || null;
  const sketchId = themeLinks?.sketchLink || null;
  const storyId = themeLinks?.storybookLink || core?.storybookLink || null;

  return (
    <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block">
      <h1 className="ds-display">{title}</h1>
      {intro && <p className="ds-u-font-size--lg ds-u-measure--base">{intro}</p>}
      <div>
        {status && (
          <Badge variation="warn" className="ds-u-margin-right--2 ds-u-text-transform--capitalize">
            {status}
          </Badge>
        )}
        {ghPath && (
          <a href={makeGithubUrl(`tree/master/packages/${ghPath}`)} className="c-page-header__link">
            <GithubIcon />
            Github
          </a>
        )}
        {storyId && (
          <a href={makeStorybookUrl(storyId, theme)} className="c-page-header__link">
            <img
              alt="Storybook logo"
              src={'/images/storybook-icon.png'}
              className="ds-u-display--inline c-page-header__icon"
            />
            Storybook
          </a>
        )}
        {sketchId && (
          <a href={makeSketchUrl(sketchId, theme)} className="c-page-header__link">
            <img
              alt="Sketch logo"
              src={'/images/sketch-icon.png'}
              className="ds-u-display--inline c-page-header__icon"
            />
            Sketch
          </a>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
