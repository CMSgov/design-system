import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';

const NotFoundPage = ({ data, location }: MdxQuery) => {
  const theme = useTheme();
  return (
    <Layout frontmatter={data.mdx.frontmatter} location={location} theme={theme}>
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query PageNotFoundQuery {
    mdx(frontmatter: { title: { eq: "Page not found" } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;

export default NotFoundPage;
