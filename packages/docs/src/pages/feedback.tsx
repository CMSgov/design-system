import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/ContentRenderer';

const FeedbackPage = ({ data, location }: MdxQuery) => {
  const theme = useTheme();
  return (
    <Layout frontmatter={data.mdx.frontmatter} location={location} theme={theme}>
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};
export const query = graphql`
  query PageFeedbackQuery {
    mdx(frontmatter: { title: { eq: "Contact us" } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;

export default FeedbackPage;
