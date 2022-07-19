import React from 'react';
import { graphql } from 'gatsby';

import Layout from './Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from './ContentRenderer';

/**
 * Template for information content pages.
 */
const InfoPage = ({ data, location }: MdxQuery) => {
  const { frontmatter, body, tableOfContents } = data.mdx;
  const theme = useTheme();

  return (
    <Layout
      frontmatter={frontmatter}
      location={location}
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
        status
      }
      body
      tableOfContents(maxDepth: 2)
    }
  }
`;

export default InfoPage;
