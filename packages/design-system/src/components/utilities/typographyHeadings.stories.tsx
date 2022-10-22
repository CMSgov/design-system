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

const heading = 'We the People of the United States';

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

export const Heading5xl = () => {
  return (
    <>
      <h1 className="ds-text-heading--5xl">{heading} (5xl)</h1>
    </>
  );
};
export const Heading4xl = () => {
  const heading = 'We the People of the United States';
  return (
    <>
      <h1 className="ds-text-heading--4xl">{heading} (4xl)</h1>
    </>
  );
};
export const Heading3xl = () => {
  const heading = 'We the People of the United States';
  return (
    <>
      <h1 className="ds-text-heading--3xl">{heading} (3xl)</h1>
    </>
  );
};
export const Heading2xl = () => {
  const heading = 'We the People of the United States';
  return (
    <>
      <h1 className="ds-text-heading--2xl">{heading} (2xl)</h1>
    </>
  );
};
export const HeadingXl = () => {
  return (
    <>
      <h1 className="ds-text-heading--xl">{heading} (xl)</h1>
    </>
  );
};
export const HeadingLg = () => {
  return (
    <>
      <h1 className="ds-text-heading--lg">{heading} (lg)</h1>
    </>
  );
};
export const HeadingMd = () => {
  return (
    <>
      <h1 className="ds-text-heading--md">{heading} (md)</h1>
    </>
  );
};
export const HeadingSm = () => {
  return (
    <>
      <h1 className="ds-text-heading--sm">{heading} (sm)</h1>
    </>
  );
};

// an example for responsive headings -- referenced in doc site
export const ResponsiveHeadings = () => (
  <>
    <h1 className="ds-text-heading--5xl">{heading} (5xl)</h1>
    <h2 className="ds-text-heading--4xl">{heading} (4xl)</h2>
    <h3 className="ds-text-heading--3xl">{heading} (3xl)</h3>
  </>
);

// an example for responsive headings -- referenced in doc site
export const ResponsiveUtilityHeadings = () => (
  <>
    <h1 className="ds-u-font-size--2xl ds-u-md-font-size--3xl ds-u-lg-font-size--4xl">
      Responsive heading using utility classes
    </h1>
  </>
);
