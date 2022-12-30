import React from 'react';
import BlogArticle from '../components/BlogArticle';
import BlogArticleLink from '../components/BlogArticleLink';
import Layout from '../components/layout/Layout';
import useTheme from '../helpers/useTheme';
import { BlogQuery } from '../helpers/graphQLTypes';
import { graphql } from 'gatsby';

const BlogIndexPage = ({ data, location }: BlogQuery) => {
  const theme = useTheme();
  const nodes = data.allMdx.edges.map((edge) => edge.node);
  const firstNode = nodes.shift();

  return (
    <Layout
      frontmatter={{
        title: "What's new",
      }}
      location={location}
      slug="blog"
      theme={theme}
    >
      <>
        <BlogArticle
          title={firstNode.frontmatter.title}
          date={firstNode.frontmatter.date}
          slug={firstNode.slug}
          body={firstNode.body}
          theme={theme}
        />
        {nodes.map((node) => (
          <BlogArticleLink
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            slug={node.slug}
            key={node.slug}
          />
        ))}
      </>
    </Layout>
  );
};

export const query = graphql`
  query BlogIndexPageQuery {
    allMdx(
      filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          slug
          body
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default BlogIndexPage;
