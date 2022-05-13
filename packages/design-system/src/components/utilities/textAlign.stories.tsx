import React from 'react';

export default {
  title: 'Utilities/Text Align',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive text align -- referenced in doc site
export const textAlign = () => (
  <div className="ds-u-sm-text-align--center ds-u-md-text-align--left ds-u-lg-text-align--right">
    We the People of the United States
  </div>
);
