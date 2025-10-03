import { define } from '../preactement/define';
import { availableSizes, Dialog, DialogProps } from '../../Dialog';
import { parseBooleanAttr } from '../wrapperUtils';
import { analyticsOverrideAttrs } from '../shared-attributes/analytics';
import { isPossibleValue } from '../utils';
import { onAnalyticsEvent } from '../analytics';

const attributes = [
  'actions-class-name',
  'alert',
  'backdrop-click-exits',
  'dialog-close-label',
  'class-name',
  'header-class-name',
  'heading',
  'root-id',
  'is-open',
  'size',
  ...analyticsOverrideAttrs,
];

interface WrapperProps
  extends Omit<
    DialogProps,
    'actions' | 'alert' | 'analytics' | 'backdropClickExits' | 'heading' | 'isOpen' | 'size'
  > {
  actions?: string;
  alert?: string;
  analytics?: string;
  backdropClickExits?: string;
  dialogCloseLabel?: string;
  heading?: string;
  rootId?: string;
  isOpen: string;
  size: string;
}

const Wrapper = ({
  alert,
  analytics,
  backdropClickExits,
  children,
  dialogCloseLabel,
  isOpen,
  rootId,
  size,
  ...otherProps
}: WrapperProps) => (
  <Dialog
    id={rootId}
    alert={parseBooleanAttr(alert)}
    ariaCloseLabel={dialogCloseLabel}
    backdropClickExits={parseBooleanAttr(backdropClickExits)}
    isOpen={parseBooleanAttr(isOpen)}
    size={isPossibleValue(size, availableSizes) ? size : undefined}
    {...otherProps}
    analytics={analytics && Boolean(JSON.parse(analytics))}
  >
    {children}
  </Dialog>
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-modal-dialog': React.JSX.IntrinsicElements['div'] & {
        actions?: string;
        'actions-class-name'?: string;
        alert?: string | boolean;
        'backdrop-click-exits'?: string | boolean;
        'dialog-close-label'?: string;
        'class-name'?: string;
        'header-class-name'?: string;
        heading?: string;
        'root-id'?: string;
        'is-open'?: string | boolean;
        size?: string;
        analytics?: string;
        'analytics-label-override'?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-modal-dialog', () => Wrapper, {
  attributes,
  events: [onAnalyticsEvent, 'onExit'],
  shadow: true,
});
