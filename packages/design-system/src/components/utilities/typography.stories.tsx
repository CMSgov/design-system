import React from 'react';

export default {
  title: 'Typography',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const Headings = () => {
  const heading = 'We the People of the United States';
  return (
    <div>
      <h1 className="ds-text-heading--4xl">{heading} (4xl)</h1>
      <h1 className="ds-text-heading--3xl">{heading} (3xl)</h1>
      <h1 className="ds-text-heading--2xl">{heading} (2xl)</h1>
      <h1 className="ds-text-heading--xl">{heading} (xl)</h1>
      <h1 className="ds-text-heading--lg">{heading} (lg)</h1>
      <h1 className="ds-text-heading--md">{heading} (md)</h1>
      <h1 className="ds-text-heading--sm">{heading} (sm)</h1>
    </div>
  );
};

export const Body = () => {
  const body =
    'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.';
  return (
    <div>
      <p className="ds-text-body--lg">
        <strong>Large:</strong> {body}
      </p>
      <p className="ds-text-body--md">
        <strong>Medium:</strong> {body}
      </p>
      <p className="ds-text-body--sm">
        <strong>Small:</strong> {body}
      </p>
    </div>
  );
};

// an example for responsive headings -- referenced in doc site
export const ResponsiveHeadings = () => (
  <article className="ds-base--inverse ds-u-padding--2">
    <h1 className="ds-text-heading--5xl ds-u-margin-y--1">.ds-text-heading--5xl</h1>
    <h2 className="ds-text-heading--4xl ds-u-margin-y--1">.ds-text-heading--4xl</h2>
    <h3 className="ds-text-heading--3xl ds-u-margin-y--1">.ds-text-heading--3xl</h3>
    <h4 className="ds-text-heading--2xl ds-u-margin-y--1 ds-u-font-size--h4 ds-u-md-font-size--h3 ds-u-lg-font-size--h2">
      Responsive utility classes
    </h4>
  </article>
);
