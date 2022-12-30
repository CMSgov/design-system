import React from 'react';
import ContentRenderer from '../content/ContentRenderer';
import Layout from '../layout/Layout';
import avoidRefresh from '../../helpers/avoidRefresh';
import format from 'date-fns/format';
import useTheme from '../../helpers/useTheme';
import { MdxQuery } from '../../helpers/graphQLTypes';
import { graphql } from 'gatsby';

/**
 * Template for information content pages.
 */
const BlogPage = ({ data, location }: MdxQuery) => {
  const { frontmatter, body, tableOfContents, slug } = data.mdx;
  const theme = useTheme();

  return (
    <Layout
      frontmatter={{
        title: "What's new",
      }}
      location={location}
      slug={slug}
      theme={theme}
      tableOfContentsData={tableOfContents?.items}
    >
      <>
        <header>
          <h2 className="ds-text-heading--2xl ds-u-margin-bottom--0">{frontmatter.title}</h2>
          <time dateTime={frontmatter.date} className="ds-text-body--sm">
            {format(new Date(frontmatter.date), 'PPP')}
          </time>
        </header>
        <ContentRenderer data={body} theme={theme} />
      </>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        date
      }
      slug
      body
      tableOfContents(maxDepth: 3)
    }
  }
`;

export default avoidRefresh(BlogPage);
