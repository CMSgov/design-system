import React from 'react';

export default {
  title: 'Utilities/Layout Grid',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive layout grid -- referenced in doc site
export const layoutGrid = () => (
  <section className="ds-l-container">
    <div className="ds-l-row">
      {['A', 'B', 'C', 'D', 'E', 'F'].map((content) => (
        <div
          className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example ds-u-padding-top--2 ds-u-padding-bottom--2"
          key={content}
        >
          {content}
        </div>
      ))}
    </div>
  </section>
);
