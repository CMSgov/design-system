import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout';
import PropTable from '../../components/PropTable';

import { ComponentPropQuery, PropQuery } from '../../helpers/graphQLTypes';

// Placeholder page for a component.
// used now to display prop table
const MockComponentPage = ({ data }: ComponentPropQuery) => {
  // moving from the deeply nested graphql structure to something flatter
  const transformedData = data?.componentMetadata?.props.reduce((acc, prop: PropQuery) => {
    const newProp = {
      name: prop.name,
      type: prop.tsType?.raw,
      defaultValue: prop.defaultValue?.value,
      description: prop.description?.childMdx?.body,
      isRequired: prop.required,
      id: prop.id,
    };
    return [...acc, newProp];
  }, []);

  return (
    <Layout pageName="Test Component">
      <PropTable data={transformedData} />
    </Layout>
  );
};

// hard-coding Alert into the props query until more component content & a proper layout page are added
export const query = graphql`
  query loadComponentPropsQuery {
    componentMetadata(displayName: { eq: "Alert" }) {
      id
      props {
        defaultValue {
          value
        }
        description {
          childMdx {
            body
          }
        }
        id
        name
        required
        tsType
      }
    }
  }
`;

export default MockComponentPage;
