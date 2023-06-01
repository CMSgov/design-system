import React from 'react';
import { Header, Footer } from '../../../../ds-healthcare-gov/src/components';

export default {
  title: 'Patterns/One column page layout',
  parameters: {
    layout: 'fullscreen',
  },
};

export const OneColumnPageLayout = () => {
  return (
    <>
      <Header />
      <main className="ds-base ds-l-container example-grid">
        <div className="ds-l-row">
          <div className="ds-l-col--12">
            <b>Page header</b>
            <br></br>
            12 columns <br></br> <code>ds-l-col--12</code>
          </div>
        </div>
        <div className="ds-l-row">
          <div className="ds-l-md-col--8 ds-l-sm-col--12">
            <b>Page content</b>
            <br></br>8 columns <br></br> <code>ds-l-md-col--8 ds-l-sm-col--12</code>
          </div>
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--12">
            <b>Page footer</b>
            <br></br>
            12 columns <br></br> <code>ds-l-col--12</code>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
