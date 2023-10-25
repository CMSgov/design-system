import React from 'react';
import Layout from '../../components/layout/Layout';
import { MdxQuery } from '../../helpers/graphQLTypes';
import AllThemesColorTable from '../../components/designer-tools/AllThemesColorTable';

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
      fullWidth
    >
      <AllThemesColorTable />
    </Layout>
  );
};

export default DesignerToolThemeColorsPage;
