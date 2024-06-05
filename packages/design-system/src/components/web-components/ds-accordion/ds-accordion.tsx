import type * as React from 'react';
import { define } from '../preactement/define';
import { Accordion } from '../../Accordion';

const attributes = ['class-name', 'bordered'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-accordion': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

define('ds-accordion', () => Accordion, { attributes });
