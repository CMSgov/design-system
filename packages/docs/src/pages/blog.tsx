import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import { BlogQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';

const BlogIndexPage = ({ data, location }: BlogQuery) => {
  const theme = useTheme();

  return (
    <Layout
      frontmatter={{
        title: "What's new",
      }}
      location={location}
      slug="blog"
      theme={theme}
    >
      <>{data.allMdx.edges.map((edge) => edge.node.frontmatter.title).join(',')}</>
    </Layout>
  );
};

export const query = graphql`
  query BlogIndexPageQuery {
    allMdx(
      filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          slug
          body
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default BlogIndexPage;
