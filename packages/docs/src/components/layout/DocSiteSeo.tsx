import { withPrefix } from 'gatsby';
import { getThemeData } from './SideNav/themeVersionData';
import useTheme from '../../helpers/useTheme';
import { FrontmatterInterface } from '../../helpers/graphQLTypes';

const SEO = ({
  frontmatter,
  slug,
  location,
}: {
  frontmatter: FrontmatterInterface;
  slug?: string;
  location: Location;
}) => {
  const env = 'prod';
  const theme = useTheme();
  const baseTitle = theme === 'core' ? 'CMS Design System' : getThemeData(theme).longName;
  const tabTitle = frontmatter?.title ? `${frontmatter.title} - ${baseTitle}` : baseTitle;
  const siteOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://design.cms.gov';

  const ogTitle = slug?.includes('not-in-sidebar') ? baseTitle : tabTitle;
  const ogType = slug?.includes('not-in-sidebar') ? 'website' : 'article';
  const ogDesc =
    frontmatter?.intro ??
    'The CMS Design System is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites.';

  return (
    <>
      <html lang="en" />
      <title>{tabTitle}</title>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={siteOrigin + location.pathname} />
      <meta property="og:description" content={ogDesc} />
      <script>{`window.tealiumEnvironment = "${env}";`}</script>
      <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
      <link
        rel="stylesheet"
        type="text/css"
        title="docThemeCss"
        href={withPrefix(`themes/${theme}-theme.css`)}
      />
    </>
  );
};

export default SEO;
