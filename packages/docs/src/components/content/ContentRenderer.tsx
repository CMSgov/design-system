import Prism from 'prismjs';
import { ThirdPartyExternalLink } from '@cmsgov/design-system';

import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Link, withPrefix } from 'gatsby';

import ButtonMigrationTable from './ButtonMigrationTable';
import ButtonVariationsTable from './ButtonVariationsTable';
import ColorExampleList from './ColorExampleList';
import ColorRamps from './ColorRamps';
import ComponentThemeOptions from './ComponentThemeOptions';
import EmbeddedExample from './EmbeddedExample';
import MaturityChecklist from './MaturityChecklist';
import ResponsiveExample from './ResponsiveExample';
import SeeStorybookForGuidance from './SeeStorybookForGuidance';
import SpacingUtilityExampleList from './SpacingUtilityExampleList';
import StorybookExample from './StorybookExample';
import TextColorList from './TextColorList';
import ThemeContent from './ThemeContent';
import StorybookDocLinks from './StorybookDocLinks';
import StorybookDocLink from './StorybookDocLink';
import linkAnalytics from '../../helpers/linkAnalytics';

// adds DS styling to tables from markdown
const TableWithClassnames = (props) => {
  return (
    <div className="ds-u-overflow--auto">
      <table className="ds-c-table" {...props}></table>
    </div>
  );
};

// using prismjs to do syntax highlighting in code blocks
const CodeWithSyntaxHighlighting = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  let language = className?.replace('language-', '');
  // catch all in case the language defined isn't supported by Prismjs
  if (!Prism.languages[language]) {
    language = 'text';
  }

  const highlightedContent = Prism.highlight(children, Prism.languages[language]);
  // eslint-disable-next-line react/no-danger
  return <code className={className} dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
};

// for preformatted text that has code as it's child, set language class on <pre> too
// this allows scrolling in code block on small screens
const PreformattedWithLanguageClass = (props: any) => {
  if (props.children?.props?.mdxType === 'code' && props.children?.props?.className) {
    return <pre className={props.children.props.className} {...props} />;
  }
  return <pre {...props} />;
};

const TextWithMaxWidth = (props: any, Component) => {
  const className = props.className ? `${props.className}` : null;
  return <Component {...props} className={className} />;
};

/**
 * Hack to fix missing path prefixes on static images imported from src
 */
const PrefixedImg = (props) => {
  // When navigating from another page, the Gatsby client dynamically pulls the new page
  // information and renders with the prefix correctly, so we only want to apply the
  // path prefix manually if it isn't already there. When we load fresh with a new HTTP
  // request to a static HTML file, it'll use what's in the HTML, so we add the prefix
  // when statically rendering, which seems to be where Gatsby fails to use it normally.
  const pathPrefix = withPrefix('/');
  const src = props.src.includes(pathPrefix) ? props.src : withPrefix(props.src);
  return <img {...props} src={src} />;
};

/**
 * Regular expression that matches valid URLs with .gov domains or ones for our repo
 */
const RE_INTERNAL_URL =
  /^(?:https?:\/\/)?(?:[a-zA-Z\-]+\.)?(?:[a-zA-Z\-]+\.(?:gov)|github\.com\/CMSgov\/design-system)(?:\/|:|\?|\&|\s|$)\/?/;
/**
 * A mapping of custom components for mdx syntax
 * Each mapping has a key with the element name and a value of a functional component to be used for that element
 */
const customComponents = (theme) => ({
  a: (props) => {
    const { href, ...restProps } = props;
    if (href.startsWith('http') && !RE_INTERNAL_URL.test(href)) {
      return <ThirdPartyExternalLink analytics={true} origin="design.cms.gov" {...props} />;
    }
    if (href.includes('github.com/CMSgov/design-system') || href.startsWith('https:')) {
      return <a href={href} {...restProps} />;
    } else {
      return <Link onClick={linkAnalytics} to={href} {...restProps} />;
    }
  },
  ButtonMigrationTable: (props) => <ButtonMigrationTable theme={theme} {...props} />,
  ButtonVariationsTable: (props) => <ButtonVariationsTable theme={theme} {...props} />,
  code: CodeWithSyntaxHighlighting,
  ColorExampleList: (props) => <ColorExampleList theme={theme} {...props} />,
  ColorRamps,
  ComponentThemeOptions: (props) => <ComponentThemeOptions theme={theme} {...props} />,
  EmbeddedExample,
  img: PrefixedImg,
  MaturityChecklist,
  ol: (props) => TextWithMaxWidth(props, 'ol'),
  p: (props) => TextWithMaxWidth(props, 'p'),
  pre: PreformattedWithLanguageClass,
  StorybookDocLinks,
  StorybookDocLink: (props) => <StorybookDocLink theme={theme} {...props} />,
  ResponsiveExample: (props) => <ResponsiveExample theme={theme} {...props} />,
  SeeStorybookForGuidance: (props) => <SeeStorybookForGuidance theme={theme} {...props} />,
  SpacingUtilityExampleList: (props) => <SpacingUtilityExampleList theme={theme} {...props} />,
  StorybookExample: (props) => <StorybookExample theme={theme} {...props} />,
  table: TableWithClassnames,
  TextColorList: (props) => <TextColorList theme={theme} {...props} />,
  ThemeContent: (props) => <ThemeContent theme={theme} {...props} />,
  ul: (props) => TextWithMaxWidth(props, 'ul'),
});

interface ContentRendererProps {
  /**
   * A string of mdx data returned from graphQL
   * Usually the `data.body.mdx` property from a `mdx` graphQL query
   */
  data: string;
  /**
   * Current theme
   */
  theme: string;
}

/**
 * ContentRenderer - a component to standardize the steps needed to display MDX content as page content
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#components for details
 */
const ContentRenderer = ({ data, theme }: ContentRendererProps) => {
  return (
    <MDXProvider components={customComponents(theme)}>
      <MDXRenderer>{data}</MDXRenderer>
    </MDXProvider>
  );
};

export default ContentRenderer;
