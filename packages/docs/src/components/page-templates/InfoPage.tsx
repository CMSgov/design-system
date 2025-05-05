import ContentRenderer from '../content/ContentRenderer';
import Layout from '../layout/Layout';
import avoidRefresh from '../../helpers/avoidRefresh';
import useTheme from '../../helpers/useTheme';
import { MdxQuery } from '../../helpers/graphQLTypes';
import { graphql } from 'gatsby';

/**
 * Template for information content pages.
 */
const InfoPage = ({ data, location }: MdxQuery) => {
  const { frontmatter, body, tableOfContents, slug } = data.mdx;
  const theme = useTheme();
  if (frontmatter.title === 'Alert') {
    console.log('Front matter', frontmatter);
  }
  if (frontmatter.title === 'Autocomplete') {
    console.log('Front matter', frontmatter);
  }

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
        intro
        status {
          level
          note
        }
        cmsgov {
          figmaNodeId
        }
        core {
          figmaNodeId
          githubLink
          storybookLink
        }
        healthcare {
          figmaNodeId
          storybookLink
          githubLink
        }
        medicare {
          figmaNodeId
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

export default avoidRefresh(InfoPage);
