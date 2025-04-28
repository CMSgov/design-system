import Layout from '../components/layout/Layout';
import SEO from '../components/layout/DocSiteSeo';
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
        {nodes.map(({ fields: { slug }, frontmatter: { date, intro, title } }, index) => (
          <article
            className={classNames(
              'ds-u-margin-bottom--3',
              'ds-u-padding-bottom--3',
              index < nodes.length - 1 && 'ds-u-border-bottom--1'
            )}
            key={slug}
          >
            <header>
              <h2 className="ds-text-heading--2xl ds-u-margin-bottom--0">
                <Link to={slug}>{title}</Link>
              </h2>
              <PublishDate date={date} />
            </header>
            <div className="ds-u-margin-top--2">{intro}</div>
          </article>
        ))}
      </>
    </Layout>
  );
};

export const Head = ({ data, location, pageContext }) => {
  return (
    <SEO
      frontmatter={{
        title: "What's new",
      }}
      slug="blog"
      location={location}
    />
  );
};

export const query = graphql`
  query BlogIndexPageQuery {
    allMdx(
      filter: { internal: { contentFilePath: { glob: "**/content/blog/*" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
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
