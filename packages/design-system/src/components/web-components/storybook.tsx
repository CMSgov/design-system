import type * as React from 'react';
import { Fragment } from 'react';

/**
 * The subset of Storybook's decorator signature this helper actually uses. Typed
 * structurally so the shipped declarations don't depend on Storybook's types.
 */
interface DecoratorContext {
  args: Record<string, any>;
  globals: Record<string, any>;
}

export function webComponentDecorator(Story: React.ComponentType, context: DecoratorContext) {
  // The Preact element `children` can have circular references which trip up Storybook's JSON evaluation
  const { children, ...simpleArgs } = context.args;
  return (
    <Fragment key={JSON.stringify({ ...simpleArgs, ...context.globals })}>
      <Story />
    </Fragment>
  );
}
