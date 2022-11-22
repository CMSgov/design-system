import React from 'react';
import { FrontmatterInterface } from '../../helpers/graphQLTypes';
import { withPrefix } from 'gatsby';
import { makeGithubUrl, makeSketchUrl, makeStorybookUrl } from '../../helpers/urlUtils';
import GithubIcon from '../icons/GithubIcon';

type PageHeaderProps = {
  frontmatter?: FrontmatterInterface;
  theme: string;
};

/**
 * Page header component that shows the page title and other details
 */
const PageHeader = ({ frontmatter = { title: '' }, theme }: PageHeaderProps) => {
  const { title, core, intro } = frontmatter;
  const themeLinks = frontmatter[theme];

  const ghPath = themeLinks?.githubLink || core?.githubLink || null;
  const sketchId = themeLinks?.sketchLink || null;
  const storyId = themeLinks?.storybookLink || core?.storybookLink || null;

  return (
    <header className="ds-u-padding--3 ds-u-sm-padding-x--6 ds-u-sm-padding-bottom--7 ds-u-sm-padding-top--2">
      <h1 className="ds-text-heading--4xl">{title}</h1>
      {intro && <p className="ds-u-font-size--lg ds-u-measure--base ds-u-margin-top--1">{intro}</p>}
      <div>
        {ghPath && (
          <a href={makeGithubUrl(`tree/main/packages/${ghPath}`)} className="c-page-header__link">
            <GithubIcon />
            Github
          </a>
        )}
        {storyId && (
          <a href={makeStorybookUrl(storyId, theme)} className="c-page-header__link">
            <img
              alt="Storybook logo"
              src={withPrefix('/images/storybook-icon.png')}
              className="ds-u-display--inline c-page-header__icon"
            />
            Storybook
          </a>
        )}
        {sketchId && (
          <a href={makeSketchUrl(sketchId, theme)} className="c-page-header__link">
            <img
              alt="Sketch logo"
              src={withPrefix('/images/sketch-icon.png')}
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
