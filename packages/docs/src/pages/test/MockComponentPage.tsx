import * as React from 'react';

import Layout from '../../components/Layout';
import PropTable from '../../components/PropTable';

// Placeholder page for a component.
// used now to display prop table
const MockComponentPage = () => {
  return (
    <Layout pageName="Test Component">
      <>
        <h2>Sample Alert Props</h2>
        <PropTable componentName="Alert" />
        <h2>Sample Autocomplete Props</h2>
        <PropTable componentName="Autocomplete" />
      </>
    </Layout>
  );
};

export default MockComponentPage;
