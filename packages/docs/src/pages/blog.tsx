import React from 'react';
import Layout from '../components/layout/Layout';
import useTheme from '../helpers/useTheme';
import { BlogQuery } from '../helpers/graphQLTypes';
import { graphql, Link } from 'gatsby';
import PublishDate from '../components/content/PublishDate';
import classNames from 'classnames';

const BlogIndexPage = ({ data, location }: BlogQuery) => {
  const theme = useTheme();
  const nodes = data.allMdx.edges.map((edge) => edge.node);

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
        {nodes.map((node, index) => (
          <article
            className={classNames(
              'ds-u-margin-bottom--3',
              'ds-u-padding-bottom--3',
              'ds-u-measure--wide',
              index < nodes.length - 1 && 'ds-u-border-bottom--1'
            )}
            key={node.slug}
          >
            <header>
              <h2 className="ds-text-heading--2xl ds-u-margin-bottom--0">
                <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
              </h2>
              <PublishDate date={node.frontmatter.date} />
            </header>
            <div className="ds-u-margin-top--2">{node.frontmatter.intro}</div>
          </article>
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
            intro
          }
        }
      }
    }
  }
`;

export default BlogIndexPage;
