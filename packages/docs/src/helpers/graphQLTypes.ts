export interface TableOfContentsItem {
  url: string;
  slug?: string;
  title: string;
  items?: TableOfContentsItem[];
}

export interface ComponentLinksInterface {
  figmaNodeId?: string;
  githubLink?: string;
  storybookLink?: string;
}

/**
 * @see https://www.gatsbyjs.com/docs/location-data-from-props/
 */
export interface LocationInterface {
  host: string;
  hostname: string;
  pathname: string;
  search?: string;
  origin?: string;
}

export interface StatusInterface {
  level: 'use' | 'caution' | 'avoid';
  note?: string;
  targetTheme?: 'core' | 'cmsgov' | 'healthcare' | 'medicare';
  targetThemeNote?: string;
}

export interface FrontmatterInterface {
  title: string;
  date?: string;
  cmsgov?: ComponentLinksInterface;
  core?: ComponentLinksInterface;
  healthcare?: ComponentLinksInterface;
  medicare?: ComponentLinksInterface;
  intro?: string;
  status?: StatusInterface;
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

export interface SearchDataStore {
  id: string;
  path: string;
  title: string;
  body: string;
  excerpt: string;
}

export interface SearchQuery {
  localSearchPages: {
    store: Record<string, SearchDataStore>[];
    index: string;
  };
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
