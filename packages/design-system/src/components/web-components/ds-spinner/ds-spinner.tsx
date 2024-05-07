import type * as React from 'react';
import { define } from '../preactement/define';
import { Spinner } from '../../Spinner';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['aria-valuetext', 'class-name', 'inversed', 'filled', 'role', 'size'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-spinner': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

const Wrapper = ({ ariaValuetext, ...otherProps }) => (
  <Spinner
    {...otherProps}
    aria-valuetext={ariaValuetext}
    inversed={parseBooleanAttr(otherProps.inversed)}
    filled={parseBooleanAttr(otherProps.filled)}
  ></Spinner>
);

define('ds-spinner', () => Wrapper, { attributes });
