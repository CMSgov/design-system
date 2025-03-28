import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';

const ContactPage = ({ children, data, location }: MdxQuery) => {
  const {
    frontmatter,
    fields: { slug },
    tableOfContents,
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
  query PageFeedbackQuery {
    mdx(frontmatter: { title: { eq: "Contact us" } }) {
      id
      fields {
        slug
      }
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
        intro
      }
    }
  }
`;

export default ContactPage;
