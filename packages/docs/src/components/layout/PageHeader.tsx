import { FrontmatterInterface } from '../../helpers/graphQLTypes';
import { linkAnalytics } from '../../helpers/analytics';
import { StatusIndicator } from './SatusIndicator';
import { withPrefix } from 'gatsby';
import { makeFigmaUrl, makeGithubUrl, makeStorybookUrl } from '../../helpers/urlUtils';
import GithubIcon from '../icons/GithubIcon';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

type PageHeaderProps = {
  frontmatter?: FrontmatterInterface;
  theme: string;
};

/**
 * Page header component that shows the page title and other details
 */
const PageHeader = ({ frontmatter = { title: '' }, theme }: PageHeaderProps) => {
  const [themeLinks, setThemeLinks] = useState(undefined);
  const { title, core, intro, status } = frontmatter;

  const figmaNodeId = themeLinks?.figmaNodeId || core?.figmaNodeId || null;
  const figmaTheme = themeLinks?.figmaNodeId ? theme : 'core';
  const ghPath = themeLinks?.githubLink || core?.githubLink || null;
  const storyId = themeLinks?.storybookLink || core?.storybookLink || null;
  const showLinkBar = Boolean(figmaNodeId || ghPath || storyId);

  // Tricks gatsby into re-rendering based on updated theme and frontmatter data
  // Similar issue and debugging strategies found here: https://github.com/gatsbyjs/gatsby/issues/12413
  useEffect(() => {
    const links = frontmatter[theme];
    setThemeLinks(links);
  }, [frontmatter, theme]);

  const headerClassNames = classNames(
    'ds-u-padding-x--3',
    'ds-u-sm-padding-x--6',
    'ds-u-sm-padding-top--2',
    showLinkBar && 'ds-u-margin-bottom--3 ds-u-lg-margin-bottom--7'
  );

  return (
    <header className={headerClassNames}>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-flex-direction--row">
        <h1 className="ds-text-heading--4xl">{title}</h1>
        {status?.level && (
          <div className="ds-u-margin-left--2">
            <StatusIndicator level={status.level} />
          </div>
        )}
      </div>
      {intro && (
        <p className="ds-u-font-size--lg ds-u-measure--base ds-u-margin-top--1 ds-u-margin-bottom--1">
          {intro}
        </p>
      )}
      {showLinkBar && (
        <div className="ds-u-margin-top--1 ds-u-margin-bottom--0">
          {figmaNodeId && (
            <a href={makeFigmaUrl(figmaNodeId, figmaTheme)} className="c-page-header__link">
              <img
                alt="Figma logo"
                src={withPrefix('/images/figma-icon.png')}
                className="ds-u-display--inline c-page-header__icon"
              />
              Figma
            </a>
          )}
          {ghPath && (
            <a href={makeGithubUrl(`tree/main/packages/${ghPath}`)} className="c-page-header__link">
              <GithubIcon />
              Github
            </a>
          )}
          {storyId && (
            <a
              onClick={(event) => linkAnalytics(event)}
              href={makeStorybookUrl(storyId, theme, 'docs')}
              className="c-page-header__link"
            >
              <img
                alt="Storybook logo"
                src={withPrefix('/images/storybook-icon.png')}
                className="ds-u-display--inline c-page-header__icon"
              />
              Storybook
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
