import { Fragment } from 'react';

export function webComponentDecorator(Story, context) {
  return (
    <Fragment key={JSON.stringify({ ...context.args, ...context.globals })}>
      <Story />
    </Fragment>
  );
}
