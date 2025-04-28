import { graphql } from 'gatsby';
import SEO from '../components/layout/DocSiteSeo';
import Layout from '../components/layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';
import useSendViewEvent from '../helpers/useSendViewEvent';

const NotFoundPage = ({ data, location, children }: MdxQuery) => {
  const { frontmatter } = data.mdx;
  useSendViewEvent();
  const theme = useTheme();
  return (
    <Layout frontmatter={frontmatter} location={location} theme={theme}>
      <ContentRenderer theme={theme}>{children}</ContentRenderer>
    </Layout>
  );
};

export const Head = ({ data, location, pageContext }) => {
  const { frontmatter } = data.mdx;

  return <SEO frontmatter={frontmatter} location={location} />;
};

export const query = graphql`
  query PageNotFoundQuery {
    mdx(frontmatter: { title: { eq: "Page not found" } }) {
      id
      frontmatter {
        title
      }
    }
  }
`;

export default NotFoundPage;
