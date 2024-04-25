import { define } from '../preactement/define';
import { SkipNav } from '../../SkipNav';
import { t } from '../../i18n';

const attributes = ['href'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
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

const Wrapper = ({ children, ...otherProps }) => (
  <SkipNav href={otherProps.href}>
    {children[0] === undefined ? t('skipNav.default') : children}
  </SkipNav>
);

define('ds-skip-nav', () => Wrapper, { attributes, events: ['onClick'] } as any);
