import React from 'react';

export default {
  title: 'Utilities/Margin',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive margin -- referenced in doc site
export const margin = () => (
  <div className="ds-u-fill--primary-alt" style={{ maxWidth: 'fit-content' }}>
    <div className="ds-u-margin--1 ds-u-sm-margin--2 ds-u-md-margin--3 ds-u-lg-margin--4 ds-u-xl-margin--5 ds-u-display--inline-block">
      <span className="ds-u-fill--white">Responsive margins</span>
    </div>
  </div>
);
