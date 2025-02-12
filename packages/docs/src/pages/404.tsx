import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import { MdxQuery } from '../helpers/graphQLTypes';
import useTheme from '../helpers/useTheme';
import ContentRenderer from '../components/content/ContentRenderer';
import { useEffect } from 'react';

declare global {
  interface Window {
    utag: {
      view: any;
    };
  }
}

const NotFoundPage = ({ data, location }: MdxQuery) => {
  useEffect(() => {
    if (window && window.utag) {
      let env = 'prod';

      switch (location.hostname) {
        case 'localhost':
          env = 'dev';
          break;
        case 'cmsgov.github.io':
          env = 'test';
          break;
        case 'design.cms.gov':
          env = 'prod';
          break;
        default:
          env = 'prod';
      }

      window.utag.view({
        content_language: 'en',
        content_type: 'html',
        logged_in: 'false',
        page_name: 'Page not found - CMS Design System',
        page_type: 'true', //If page is a 404 (error page) this is set to true, otherwise it is false
        site_environment: env, //Used to include or exclude traffic from different testing environments. Ex: test, test0, imp, production
        site_section: 'Page not found - CMS Design System',
      });
    }
  }, []);

  const theme = useTheme();
  return (
    <Layout frontmatter={data.mdx.frontmatter} location={location} theme={theme}>
      <ContentRenderer data={data.mdx.body} theme={theme} />
    </Layout>
  );
};

export const query = graphql`
  query PageNotFoundQuery {
    mdx(frontmatter: { title: { eq: "Page not found" } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;

export default NotFoundPage;
