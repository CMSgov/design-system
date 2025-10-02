import { define } from '../preactement/define';
import { SkipNav } from '../../SkipNav';

const attributes = ['href'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-skip-nav': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

define('ds-skip-nav', () => SkipNav, { attributes, events: ['onClick'] });
