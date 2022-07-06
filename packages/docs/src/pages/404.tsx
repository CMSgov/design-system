import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import { getTheme } from '../helpers/themeUtils';
import ContentRenderer from '../components/ContentRenderer';

const NotFoundPage = ({ data, location }: MdxQuery) => {
  const theme = getTheme();
  return (
    <Layout pageName="Page not found" location={location} theme={theme}>
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query PageNotFoundQuery {
    mdx(frontmatter: { title: { eq: "Page not found" } }) {
      id
      body
    }
  }
`;

export default NotFoundPage;
