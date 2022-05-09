import React from 'react';

export default {
  title: 'Typography/Responsive',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive headings -- referenced in doc site
export const headings = () => (
  <article className="ds-base--inverse ds-u-padding--2">
    <h1 className="ds-text-heading--5xl ds-u-margin-y--1">.ds-text-heading--5xl</h1>
    <h2 className="ds-text-heading--4xl ds-u-margin-y--1">.ds-text-heading--4xl</h2>
    <h3 className="ds-text-heading--3xl ds-u-margin-y--1">.ds-text-heading--3xl</h3>
    <h4 className="ds-text-heading--2xl ds-u-margin-y--1 ds-u-font-size--h4 ds-u-md-font-size--h3 ds-u-lg-font-size--h2">
      Responsive utility classes
    </h4>
  </article>
);
