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
  const { title, relatedUswdsGuidance, showJumpToGuidance, status } = frontmatter;
  return (
    <Layout
      pageName={title}
      relatedGuidance={relatedUswdsGuidance}
      showJumpToGuidance={showJumpToGuidance}
      status={status}
    >
      <ContentRenderer data={body} />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        status
        showJumpToGuidance
        relatedUswdsGuidance
      }
      body
    }
  }
`;

export default InfoPage;
