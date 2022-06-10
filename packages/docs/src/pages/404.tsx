import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import ContentRenderer from '../components/ContentRenderer';

const NotFoundPage = ({ data, location }: MdxQuery) => {
  return (
    <Layout pageName="Page not found" location={location}>
      <ContentRenderer data={data.mdx.body} />
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
