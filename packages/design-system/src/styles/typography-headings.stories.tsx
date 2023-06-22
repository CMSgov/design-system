import React from 'react';
export default {
  title: 'Foundations/Typography/Headings',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

const heading = 'Example heading';

export const AllHeadings = () => {
  return (
    <>
      <h1 className="ds-text-heading--5xl">{heading} (5xl)</h1>
      <h1 className="ds-text-heading--4xl">{heading} (4xl)</h1>
      <h1 className="ds-text-heading--3xl">{heading} (3xl)</h1>
      <h1 className="ds-text-heading--2xl">{heading} (2xl)</h1>
      <h1 className="ds-text-heading--xl">{heading} (xl)</h1>
      <h1 className="ds-text-heading--lg">{heading} (lg)</h1>
      <h1 className="ds-text-heading--md">{heading} (md)</h1>
      <h1 className="ds-text-heading--sm">{heading} (sm)</h1>
    </>
  );
};

export const AllHeadingsOnDark = AllHeadings.bind({});

AllHeadingsOnDark.parameters = {
  baseInverse: true,
};

export const ContentClass = () => (
  <div className="ds-content">
    <h1>{heading} level 1</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
    <h2>{heading} level 2</h2>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <h3>{heading} level 3</h3>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
    <ul>
      <li>A list</li>
      <li>Of items</li>
    </ul>
    <p>
      Arcu risus quis varius quam quisque. Suspendisse ultrices gravida dictum fusce ut placerat.
    </p>
    <h4>{heading} level 4</h4>
    <p>
      Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Sed vulputate mi sit amet mauris
      commodo. Blandit massa enim nec dui nunc. Vestibulum lorem sed risus ultricies tristique.
    </p>
    <ol>
      <li>An orderly list of items</li>
      <li>So ordered</li>
    </ol>
    <h5>{heading} level 5</h5>
    <p>
      Non diam phasellus vestibulum lorem sed risus ultricies tristique. Elementum eu facilisis sed
      odio. Tempor orci dapibus ultrices in iaculis nunc sed augue. Arcu non sodales neque sodales
      ut etiam sit amet.
    </p>
    <h6>{heading} level 6</h6>
    <p>
      Hac habitasse platea dictumst quisque sagittis purus sit amet. Ultrices neque ornare aenean
      euismod. Dignissim sodales ut eu sem integer vitae.
    </p>
  </div>
);

export const Heading5xl = () => <h1 className="ds-text-heading--5xl">{heading} (5xl)</h1>;

export const Heading4xl = () => <h1 className="ds-text-heading--4xl">{heading} (4xl)</h1>;

export const Heading3xl = () => <h1 className="ds-text-heading--3xl">{heading} (3xl)</h1>;

export const Heading2xl = () => <h1 className="ds-text-heading--2xl">{heading} (2xl)</h1>;

export const HeadingXl = () => <h1 className="ds-text-heading--xl">{heading} (xl)</h1>;

export const HeadingLg = () => <h1 className="ds-text-heading--lg">{heading} (lg)</h1>;

export const HeadingMd = () => <h1 className="ds-text-heading--md">{heading} (md)</h1>;

export const HeadingSm = () => <h1 className="ds-text-heading--sm">{heading} (sm)</h1>;

// an example for responsive headings -- referenced in doc site
export const ResponsiveHeadings = () => (
  <>
    <h1 className="ds-text-heading--5xl">{heading} (5xl)</h1>
    <h2 className="ds-text-heading--4xl">{heading} (4xl)</h2>
    <h3 className="ds-text-heading--3xl">{heading} (3xl)</h3>
  </>
);
