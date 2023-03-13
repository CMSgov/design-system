export interface TableOfContentsItem {
  url: string;
  slug?: string;
  title: string;
  items?: TableOfContentsItem[];
}

export interface ComponentLinksInterface {
  githubLink?: string;
  sketchLink?: string;
  storybookLink?: string;
}

/**
 * @see https://www.gatsbyjs.com/docs/location-data-from-props/
 */
export interface LocationInterface {
  pathname: string;
  search?: string;
}

export interface FrontmatterInterface {
  title: string;
  date?: string;
  core?: ComponentLinksInterface;
  healthcare?: ComponentLinksInterface;
  medicare?: ComponentLinksInterface;
  intro?: string;
}

/**
 * typing for the `mdx` graphQL query
 */
export interface MdxQuery {
  data: {
    mdx: {
      id: string;
      body: string;
      slug?: string;
      frontmatter: FrontmatterInterface;
      tableOfContents?: {
        items: TableOfContentsItem[];
      };
    };
  };
  location?: LocationInterface;
}

export interface BlogQuery {
  data: {
    allMdx: {
      edges: {
        node: {
          body: string;
          slug?: string;
          frontmatter: {
            title: string;
            date: string;
            intro: string;
          };
        };
      }[];
    };
  };
  location?: LocationInterface;
}

export interface NavItem {
  relativePath: string;
  childMdx: {
    frontmatter?: {
      title: string;
      order?: number;
    };
  };
}

export interface ContentDirectoryGroup {
  fieldValue: string;
  edges: {
    node: NavItem;
  }[];
}

export interface NavDataQuery {
  allFile: {
    group: ContentDirectoryGroup[];
  };
}
