import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import { getQueryParamValue } from '../helpers/urlUtils';
import { updateThemeLocalStorage } from '../helpers/storageUtils';
import ContentRenderer from '../components/ContentRenderer';

// Main landing page for site
const IndexPage = ({ data, location }: MdxQuery) => {
  const themeParam = getQueryParamValue('theme');
  const theme = updateThemeLocalStorage(themeParam);

  return (
    <Layout pageName="Introduction" location={location} theme={theme}>
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query IntroPageQuery {
    mdx(frontmatter: { title: { eq: "Introduction" } }) {
      id
      body
    }
  }
`;

export default IndexPage;
