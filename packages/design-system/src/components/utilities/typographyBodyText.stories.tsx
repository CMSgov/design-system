export default {
  title: 'Foundations/Typography/BodyText',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

const body =
  'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.';

export const AllBodyText = () => {
  return (
    <>
      <p className="ds-text-body--lg">
        <strong>Large:</strong> {body}
      </p>
      <p className="ds-text-body--md">
        <strong>Medium:</strong> {body}
      </p>
      <p className="ds-text-body--sm">
        <strong>Small:</strong> {body}
      </p>
    </>
  );
};
export const BodyTextLarge = () => {
  return (
    <>
      <p className="ds-text-body--lg">
        <strong>Large:</strong> {body}
      </p>
    </>
  );
};
export const BodyTextMedium = () => {
  return (
    <>
      <p className="ds-text-body--md">
        <strong>Medium:</strong> {body}
      </p>
    </>
  );
};
export const BodyTextSmall = () => {
  return (
    <>
      <p className="ds-text-body--sm">
        <strong>Small:</strong> {body}
      </p>
    </>
  );
};
