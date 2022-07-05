import React from 'react';
import { graphql } from 'gatsby';

import Layout from './Layout';
import { MdxQuery, TableOfContentsItem } from '../helpers/graphQLTypes';
import { getQueryParamValue } from '../helpers/urlUtils';
import { updateThemeLocalStorage } from '../helpers/storageUtils';
import ContentRenderer from './ContentRenderer';

/**
 * Template for information content pages.
 */
const InfoPage = ({ data, location }: MdxQuery) => {
  const { frontmatter, body, tableOfContents } = data.mdx;
  const { title, relatedUswdsGuidance, status } = frontmatter;
  let showGuidance = false;

  const themeParam = getQueryParamValue('theme');
  const theme = updateThemeLocalStorage(themeParam);

  // check table of contents to see if there is a guidance section
  if (tableOfContents && Object.keys(tableOfContents).length) {
    showGuidance = tableOfContents.items.some(
      (item: TableOfContentsItem) => item.title === 'Guidance'
    );
  }

  return (
    <Layout
      pageName={title}
      relatedGuidance={relatedUswdsGuidance}
      showJumpToGuidance={showGuidance}
      status={status}
      location={location}
      theme={theme}
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
        relatedUswdsGuidance
      }
      body
      tableOfContents
    }
  }
`;

export default InfoPage;
