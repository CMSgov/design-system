import React from 'react';
import ContentRenderer from '../content/ContentRenderer';
import Layout from '../layout/Layout';
import avoidRefresh from '../../helpers/avoidRefresh';
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
      frontmatter={frontmatter}
      location={location}
      slug={slug}
      theme={theme}
      tableOfContentsData={tableOfContents?.items}
    >
      <ContentRenderer data={body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        intro
        core {
          githubLink
          sketchLink
          storybookLink
        }
        healthcare {
          sketchLink
          storybookLink
          githubLink
        }
        medicare {
          sketchLink
          storybookLink
          githubLink
        }
      }
      slug
      body
      tableOfContents(maxDepth: 3)
    }
  }
`;

export default avoidRefresh(BlogPage);
