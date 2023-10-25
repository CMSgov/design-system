import React from 'react';
import Layout from '../../components/layout/Layout';
import { MdxQuery } from '../../helpers/graphQLTypes';

const DesignerToolThemeColorsPage = ({ location }: MdxQuery) => {
  const theme = 'core';
  return (
    <Layout
      frontmatter={{
        title: 'All theme colors',
      }}
      location={location}
      slug="all-theme-colors"
      theme={theme}
    >
      <div>Hello world</div>
    </Layout>
  );
};

export default DesignerToolThemeColorsPage;
