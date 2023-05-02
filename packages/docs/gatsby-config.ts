import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `cms-design-system-docs`,
    siteUrl: `https://www.design.cms.gov`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      // content to display on site
      options: {
        name: 'content',
        path: './content/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      // components to load prop data from
      options: {
        name: 'components',
        path: '../design-system/src/components',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      // components to load prop data from
      options: {
        name: 'hgov-components',
        path: '../ds-healthcare-gov/src/components',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      // components to load prop data from
      options: {
        name: 'mgov-components',
        path: '../ds-medicare-gov/src/components',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'CMS Design System',
        short_name: 'CMS DS',
        start_url: '/',
        background_color: '#0071bc',
        theme_color: '#0071bc',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'src/images/favicon.ico', // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: ['gatsby-remark-autolink-headers'],
      },
    },
    {
      resolve: 'gatsby-plugin-newrelic',
      options: {
        config: {
          instrumentationType: 'proAndSPA',
          accountId: '402306',
          trustKey: '39033',
          agentID: '1134210514',
          licenseKey: '5a79be86db',
          applicationID: '1134210514',
          beacon: 'gov-bam.nr-data.net',
          errorBeacon: 'gov-bam.nr-data.net',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: '',
        query: `
          {
            allMdx (
              filter: {fileAbsolutePath: {glob: "**/content/**/*"}}
            ) {
              edges {
                node {
                  id
                  slug
                  body
                  frontmatter {
                    title
                    intro
                  }
                  rawBody
                }
              }
            }
          }
          `,
        ref: 'id',
        index: ['title', 'body'],
        store: ['id', 'path', 'title'],
        normalizer: ({ data }) =>
          data.allMdx.edges.map((n) => ({
            id: n.node.id,
            path: n.node.slug,
            title: n.node.frontmatter.title,
            body: n.node.rawBody,
          })),
      },
    },
  ],
};

if (process.env.PATH_PREFIX) {
  config.pathPrefix = process.env.PATH_PREFIX;
}

export default config;
