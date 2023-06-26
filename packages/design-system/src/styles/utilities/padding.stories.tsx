import React from 'react';
export default {
  title: 'Utilities/Padding',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const padding = () => (
  <div className="ds-u-fill--info" style={{ maxWidth: 'fit-content' }}>
    <div className="ds-u-padding--1 ds-u-sm-padding--2 ds-u-md-padding--3 ds-u-lg-padding--4 ds-u-xl-padding--5">
      <span className="ds-u-fill--white">Responsive padding</span>
    </div>
  </div>
);
