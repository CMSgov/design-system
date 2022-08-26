import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/ContentRenderer';

const FeedbackPage = ({ data, location }: MdxQuery) => {
  const { slug } = data.mdx;
  const theme = useTheme();
  return (
    <Layout
      frontmatter={data.mdx.frontmatter}
      location={location}
      slug={slug}
      theme={theme}
      tableOfContentsData={data.mdx.tableOfContents?.items}
    >
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};
export const query = graphql`
  query PageFeedbackQuery {
    mdx(frontmatter: { title: { eq: "Contact us" } }) {
      id
      body
      slug
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
        intro
      }
    }
  }
`;

export default FeedbackPage;
