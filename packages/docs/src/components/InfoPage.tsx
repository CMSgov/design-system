import React from 'react';
import { graphql } from 'gatsby';

import Layout from './Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import ContentRenderer from './ContentRenderer';

/**
 * Template for information content pages.
 */
const InfoPage = ({ data }: MdxQuery) => {
  const { frontmatter, body } = data.mdx;
  return (
    <Layout pageName={frontmatter.title}>
      <ContentRenderer data={body} />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        parentNavItem
        title
      }
      body
    }
  }
`;

export default InfoPage;
