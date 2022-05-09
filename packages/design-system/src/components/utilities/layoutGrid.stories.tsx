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
  <section className="ds-l-container preview__grid">
    <div className="ds-l-row">
      {['A', 'B', 'C', 'D', 'E', 'F'].map((content) => (
        <div
          className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2"
          key={content}
          style={{
            backgroundColor: '#e1f3f8',
            outline: '2px dashed #02bfe7',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
        >
          {content}
        </div>
      ))}
    </div>
  </section>
);
