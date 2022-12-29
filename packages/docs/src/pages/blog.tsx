import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';

const BlogIndexPage = ({ data, location }: MdxQuery) => {
  const { slug } = data.mdx;
  const theme = useTheme();

  return (
    <Layout
      frontmatter={data.mdx.frontmatter}
      location={location}
      slug={slug}
      theme={theme}
      tableOfContentsData={data.mdx.tableOfContents?.items}
    >
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query BlogIndexPageQuery {
    mdx(frontmatter: { title: { eq: "Introduction" } }) {
      id
      body
      slug
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
      }
    }
  }
`;

export default BlogIndexPage;
