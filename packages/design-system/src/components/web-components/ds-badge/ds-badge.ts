import { define } from '../preactement/define';
import { Badge } from '../../Badge';

const attributes = ['class-name', 'size', 'variation'];

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-badge': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-badge', () => Badge, { attributes });
