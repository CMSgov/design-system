import type * as React from 'react';
import { define } from '../preactement/define';
import { Spinner } from '../../Spinner';
import { SpinnerProps } from '../../Spinner/Spinner';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['aria-valuetext', 'class-name', 'inversed', 'filled', 'role', 'size'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
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

interface WrapperProps extends Omit<SpinnerProps, 'aria-valuetext' | 'inversed' | 'filled'> {
  ariaValuetext?: string;
  inversed?: string;
  filled?: string;
}

const Wrapper = ({ ariaValuetext, ...otherProps }: WrapperProps) => (
  <Spinner
    {...otherProps}
    aria-valuetext={ariaValuetext}
    inversed={parseBooleanAttr(otherProps.inversed)}
    filled={parseBooleanAttr(otherProps.filled)}
  ></Spinner>
);

define('ds-spinner', () => Wrapper, { attributes });
