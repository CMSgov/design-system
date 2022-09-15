import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

export default {
  title: 'Patterns/One column page layout',
};

export const OneColumnPageLayout = () => {
  return (
    <>
      <Header />
      <main className="ds-base ds-l-container example-grid">
        <div className="ds-l-row">
          <div className="ds-l-col--12">
            12 columns<br></br>Page footer
          </div>
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--8">
            8 columns<br></br>Page content
          </div>
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--12">
            12 columns<br></br>Page footer
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
