import React from 'react';
import { graphql } from 'gatsby';

import Layout from './Layout';
import { MdxQuery, TableOfContentsItem } from '../helpers/graphQLTypes';
import ContentRenderer from './ContentRenderer';

/**
 * Template for information content pages.
 */
const InfoPage = ({ data }: MdxQuery) => {
  const { frontmatter, body, tableOfContents } = data.mdx;
  const { title, relatedUswdsGuidance, status } = frontmatter;

  // check table of contents to see if there is a guidance section
  const showGuidance = tableOfContents.items.some(
    (item: TableOfContentsItem) => item.title === 'Guidance'
  );

  return (
    <Layout
      pageName={title}
      relatedGuidance={relatedUswdsGuidance}
      showJumpToGuidance={showGuidance}
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
        relatedUswdsGuidance
      }
      body
      tableOfContents
    }
  }
`;

export default InfoPage;
