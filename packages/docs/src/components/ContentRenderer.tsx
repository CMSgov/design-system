import React from 'react';
import Prism from 'prismjs';

import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import ButtonMigrationTable from './ButtonMigrationTable';
import ButtonVariationsTable from './ButtonVariationsTable';
import EmbeddedExample from './EmbeddedExample';
import StorybookExample from './StorybookExample';
import ComponentThemeOptions from './ComponentThemeOptions';
import ThemeContent from './ThemeContent';
import PropTable from './PropTable';
import ResponsiveExample from './ResponsiveExample';
import ColorSwatchList from './ColorSwatchList';

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
  const className = `ds-u-measure--wide ${props.className || ''}`;
  return <Component {...props} className={className} />;
};

/**
 * A mapping of custom components for mdx syntax
 * Each mapping has a key with the element name and a value of a functional component to be used for that element
 */
const customComponents = (theme) => ({
  table: TableWithClassnames,
  code: CodeWithSyntaxHighlighting,
  pre: PreformattedWithLanguageClass,
  p: (props) => TextWithMaxWidth(props, 'p'),
  ul: (props) => TextWithMaxWidth(props, 'ul'),
  ol: (props) => TextWithMaxWidth(props, 'ol'),
  EmbeddedExample,
  StorybookExample: (props) => <StorybookExample theme={theme} {...props} />,
  PropTable: (props) => <PropTable theme={theme} {...props} />,
  ResponsiveExample: (props) => <ResponsiveExample theme={theme} {...props} />,
  ColorSwatchList: (props) => <ColorSwatchList theme={theme} {...props} />,
  ComponentThemeOptions: (props) => <ComponentThemeOptions theme={theme} {...props} />,
  ThemeContent: (props) => <ThemeContent theme={theme} {...props} />,
  ButtonMigrationTable: (props) => <ButtonMigrationTable theme={theme} {...props} />,
  ButtonVariationsTable: (props) => <ButtonVariationsTable theme={theme} {...props} />,
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
