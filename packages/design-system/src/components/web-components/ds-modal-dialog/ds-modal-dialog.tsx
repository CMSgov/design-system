import { define } from '../preactement/define';
import { availableSizes, Dialog, DialogProps, DialogSize } from '../../Dialog';
import { parseBooleanAttr } from '../wrapperUtils';
import { analyticsOverrideAttrs } from '../shared-attributes/analytics';
import { isPossibleValue } from '../utils';

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

const isAcceptableSize = (size: string): size is DialogSize => {
  return ['narrow', 'wide', 'full'].includes(size);
};

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
    analytics={parseBooleanAttr(analytics)}
  >
    {children}
  </Dialog>
);

define('ds-modal-dialog', () => Wrapper, {
  attributes,
  events: ['onAnalyticsEvent', 'onExit'],
});
