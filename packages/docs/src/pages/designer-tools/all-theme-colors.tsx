import React from 'react';
import Layout from '../../components/layout/Layout';
import { Helmet } from 'react-helmet';
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
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <AllThemesColorTable />
      </>
    </Layout>
  );
};

export default DesignerToolThemeColorsPage;
