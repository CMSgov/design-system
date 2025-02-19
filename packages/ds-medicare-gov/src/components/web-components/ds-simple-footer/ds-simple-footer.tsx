import { SimpleFooter } from '../../SimpleFooter';
import { define } from '../../../../../design-system/src/components/web-components/preactement/define';

const attributes = [
  'about-medicare-label',
  'nondiscrimination-label',
  'privacy-policy-label',
  'privacy-setting-label',
  'linking-policy-label',
  'using-this-site-label',
  'plain-writing-label',
  'website-info',
  'language',
];

const Wrapper = ({ ...otherProps }) => {
  return <SimpleFooter {...otherProps}></SimpleFooter>;
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-simple-footer': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-simple-footer', () => Wrapper, {
  attributes,
  events: [
    [
      'onClickLinkAnalytics',
      (url: string) => ({
        detail: { url },
      }),
    ],
  ],
} as any);
