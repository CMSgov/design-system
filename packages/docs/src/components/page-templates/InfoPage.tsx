import ContentRenderer from '../content/ContentRenderer';
import Layout from '../layout/Layout';
import useTheme from '../../helpers/useTheme';
import { MdxQuery } from '../../helpers/graphQLTypes';
import { graphql } from 'gatsby';

/**
 * Template for information content pages.
 */
const InfoPage = ({ children, data, location }: MdxQuery) => {
  const {
    frontmatter,
    tableOfContents,
    fields: { slug },
  } = data.mdx;
  const theme = useTheme();

  return (
    <Layout
      frontmatter={frontmatter}
      location={location}
      slug={slug}
      theme={theme}
      tableOfContentsData={tableOfContents?.items}
    >
      <ContentRenderer theme={theme}>{children}</ContentRenderer>
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
      fields {
        slug
      }
      tableOfContents(maxDepth: 3)
    }
  }
`;

export default InfoPage;
