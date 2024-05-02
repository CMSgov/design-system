import { Fragment } from 'react';

export function webComponentDecorator(Story, context) {
  // The Preact element `children` can have circular references which trip up Storybook's JSON evaluation
  const { children, ...simpleArgs } = context.args;
  return (
    <Fragment key={JSON.stringify({ ...simpleArgs, ...context.globals })}>
      <Story />
    </Fragment>
  );
}
