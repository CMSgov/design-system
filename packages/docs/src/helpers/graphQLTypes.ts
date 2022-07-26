import { PageStatus } from '../components/Layout';

export interface TableOfContentsItem {
  url: string;
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
}

export interface FrontmatterInterface {
  title: string;
  status?: PageStatus;
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
      frontmatter: FrontmatterInterface;
      tableOfContents?: {
        items: TableOfContentsItem[];
      };
    };
  };
  location?: LocationInterface;
}

export interface PropQuery {
  defaultValue: any;
  description: {
    childMdx: {
      body: string;
    };
    text?: string;
  };
  id: string;
  name: string;
  required: boolean;
  tsType: any;
}

export interface ComponentPropQuery {
  allComponentMetadata: {
    edges: {
      node: {
        id: string;
        displayName: string;
        props: PropQuery[];
      };
    }[];
  };
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
