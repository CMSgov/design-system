import React from 'react';
export default {
  title: 'Utilities/Flexbox',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive flexbox -- referenced in doc site
export const flexbox = () => (
  <div>
    <article className="ds-u-sm-justify-content--center ds-u-md-justify-content--between ds-u-lg-justify-content--around ds-u-display--flex ds-u-padding--1 ds-u-border--1">
      <div className="utility-example ds-u-padding--1 ds-u-margin--1">Element #1</div>
      <div className="utility-example ds-u-padding--1 ds-u-margin--1">Element #2</div>
      <div className="utility-example ds-u-padding--1 ds-u-margin--1">Element #3</div>
    </article>
  </div>
);
