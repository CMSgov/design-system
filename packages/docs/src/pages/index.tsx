import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import { getTheme } from '../helpers/themeUtils';
import ContentRenderer from '../components/ContentRenderer';

// Main landing page for site
const IndexPage = ({ data, location }: MdxQuery) => {
  const theme = getTheme();

  return (
    <Layout
      pageName="Introduction"
      location={location}
      theme={theme}
      tableOfContentsData={data.mdx.tableOfContents?.items}
    >
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query IntroPageQuery {
    mdx(frontmatter: { title: { eq: "Introduction" } }) {
      id
      body
      tableOfContents(maxDepth: 2)
    }
  }
`;

export default IndexPage;
