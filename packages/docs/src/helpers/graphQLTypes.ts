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
      };
    };
  };
}

export interface PropQuery {
  defaultValue: any;
  description: {
    childMdx: {
      body: string;
    };
  };
  id: string;
  name: string;
  required: boolean;
  tsType: any;
}

export interface ComponentPropQuery {
  data: {
    componentMetadata: {
      id: string;
      props: PropQuery[];
    };
  };
}
