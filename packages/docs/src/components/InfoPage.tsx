import { memo } from 'react';
import { graphql } from 'gatsby';

import Layout from './layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from './content/ContentRenderer';

/**
 * Template for information content pages.
 */
const InfoPage = ({ data, location }: MdxQuery) => {
  const { frontmatter, body, tableOfContents, slug } = data.mdx;
  const theme = useTheme();

  return (
    <Layout
      frontmatter={frontmatter}
      location={location}
      slug={slug}
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
        intro
        core {
          githubLink
          sketchLink
          storybookLink
        }
        healthcare {
          sketchLink
          storybookLink
          githubLink
        }
        medicare {
          sketchLink
          storybookLink
          githubLink
        }
      }
      slug
      body
      tableOfContents(maxDepth: 3)
    }
  }
`;

function compareProps(prevProps, nextProps) {
  const nextLocation = nextProps.location;
  const prevLocation = prevProps.location;
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (
    nextLocation.pathname === prevLocation.pathname &&
    nextLocation.search === prevLocation.search
  ) {
    return true;
  }
  return false;
}

export default memo(InfoPage, compareProps);
