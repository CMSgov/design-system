import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import '../styles/index.scss';

import Layout from '../components/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';

// Main landing page for site
const IndexPage = ({ data }: MdxQuery) => {
  return (
    <Layout pageName="Introduction">
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
