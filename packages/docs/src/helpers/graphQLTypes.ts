import { PageStatus } from '../components/Layout';

export interface TableOfContentsItem {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
}

/**
 * @see https://www.gatsbyjs.com/docs/location-data-from-props/
 */
export interface LocationInterface {
  pathname: string;
}

/**
 * typing for the `mdx` graphQL query
 */
export interface MdxQuery {
  data: {
    mdx: {
      id: string;
      body: string;
      frontmatter: {
        title: string;
        relatedUswdsGuidance?: string;
        status?: PageStatus;
      };
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
