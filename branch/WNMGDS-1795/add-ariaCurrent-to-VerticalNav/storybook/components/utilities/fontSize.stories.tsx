import React from 'react';

export default {
  title: 'Utilities/Font Size',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive font size -- referenced in doc site
export const fontSize = () => (
  <div className="ds-u-font-size--base ds-u-sm-font-size--lg ds-u-md-font-size--xl ds-u-lg-font-size--2xl ds-u-xl-font-size--3xl">
    We the People of the United States, in Order to form a more perfect Union
  </div>
);
