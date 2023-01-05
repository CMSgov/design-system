import React from 'react';
import ContentRenderer from '../content/ContentRenderer';
import Layout from '../layout/Layout';
import avoidRefresh from '../../helpers/avoidRefresh';
import PublishDate from '../content/PublishDate';
import useTheme from '../../helpers/useTheme';
import { MdxQuery } from '../../helpers/graphQLTypes';
import { graphql, Link } from 'gatsby';
import BackIcon from '../icons/BackIcon';

/**
 * Template for information content pages.
 */
const BlogPage = ({ data, location }: MdxQuery) => {
  const { frontmatter, body, tableOfContents, slug } = data.mdx;
  const theme = useTheme();

  return (
    <Layout
      frontmatter={frontmatter}
      location={location}
      slug={slug}
      theme={theme}
      tableOfContentsData={tableOfContents?.items}
      pageHeader={
        <header className="ds-u-padding--3 ds-u-sm-padding-x--6 ds-u-sm-padding-bottom--3 ds-u-sm-padding-top--2">
          <div>
            <Link to="/blog/">
              <BackIcon className="ds-u-margin-right--1" />
              See other releases
            </Link>
          </div>
          <h1 className="ds-text-heading--4xl ds-u-sm-margin-top--2 ds-u-margin-bottom--1">
            {frontmatter.title}
          </h1>
          <PublishDate date={frontmatter.date} />
        </header>
      }
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
        date
      }
      slug
      body
      tableOfContents(maxDepth: 3)
    }
  }
`;

export default avoidRefresh(BlogPage);
