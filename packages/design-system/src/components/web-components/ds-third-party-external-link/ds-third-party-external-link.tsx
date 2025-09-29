import { define } from '../preactement/define';
import { ThirdPartyExternalLink } from '../../ThirdPartyExternalLink';
import { ThirdPartyExternalLinkProps } from '../../ThirdPartyExternalLink/ThirdPartyExternalLink';
import { analyticsOverrideAttrs, analyticsParentDataAttrs } from '../shared-attributes/analytics';
import { parseBooleanAttr } from '../wrapperUtils';
import { onAnalyticsEvent } from '../analytics';

const attributes = [
  'aria-described-by',
  'href',
  'class-name',
  'learn-more-url',
  'origin',
  ...analyticsOverrideAttrs,
  ...analyticsParentDataAttrs,
];

interface WrapperProps extends Omit<ThirdPartyExternalLinkProps, 'analytics'> {
  analytics?: string;
}

const Wrapper = ({ analytics, ...otherProps }: WrapperProps) => (
  <ThirdPartyExternalLink
    {...otherProps}
    analytics={analytics ? parseBooleanAttr(analytics) : undefined}
  />
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-third-party-external-link': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-third-party-external-link', () => Wrapper, {
  attributes,
  events: [onAnalyticsEvent],
});
