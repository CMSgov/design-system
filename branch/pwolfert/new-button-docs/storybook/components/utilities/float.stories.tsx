import React from 'react';

export default {
  title: 'Utilities/Float',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive float -- referenced in doc site
export const float = () => (
  <div className="ds-u-clearfix">
    <strong className="ds-u-margin--2">Inline text</strong>
    <div className="ds-u-float--none ds-u-md-float--left ds-u-lg-float--right">
      <p className="ds-u-md-display--none preview__element ds-u-padding--2 utility-example">
        Float none
      </p>
      <p className="ds-u-display--none ds-u-md-display--inline-block ds-u-lg-display--none preview__element ds-u-padding--2 utility-example">
        Float left
      </p>
      <p className="ds-u-display--none ds-u-lg-display--inline-block preview__element ds-u-padding--2 utility-example">
        Float right
      </p>
    </div>
  </div>
);
