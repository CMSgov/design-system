export default {
  title: 'Foundations/Typography',
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
      <h1 className="ds-text-heading--5xl">{heading} (5xl)</h1>
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
  <>
    <h1 className="ds-text-heading--5xl">We the People of the United States (5xl)</h1>
    <h2 className="ds-text-heading--4xl">We the People of the United States (4xl)</h2>
    <h3 className="ds-text-heading--3xl">We the People of the United States (3xl)</h3>
  </>
);

// an example for responsive headings -- referenced in doc site
export const ResponsiveUtilityHeadings = () => (
  <>
    <h1 className="ds-u-font-size--2xl ds-u-md-font-size--3xl ds-u-lg-font-size--4xl">
      Responsive heading with utility classes
    </h1>
  </>
);
