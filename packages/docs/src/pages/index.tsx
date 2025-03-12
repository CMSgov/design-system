import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';

// Main landing page for site
const IndexPage = ({ children, data, location }: MdxQuery) => {
  const { slug, frontmatter, tableOfContents } = data.mdx;
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
  query IntroPageQuery {
    mdx(frontmatter: { title: { eq: "Introduction" } }) {
      id
      fields {
        slug
      }
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
      }
    }
  }
`;

export default IndexPage;
