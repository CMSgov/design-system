import { define } from '../preactement/define';
import { Dialog, DialogProps, DialogSize } from '../../Dialog';
import { parseBooleanAttr } from '../wrapperUtils';
import { analyticsAttrs } from '../shared-attributes/analytics';

const attributes = [
  'actions-class-name',
  'alert',
  'dialog-close-label',
  'class-name',
  'header-class-name',
  'heading',
  'root-id',
  'is-open',
  'size',
  ...analyticsAttrs,
];

interface WrapperProps
  extends Omit<DialogProps, 'actions' | 'alert' | 'analytics' | 'heading' | 'isOpen' | 'size'> {
  actions?: string;
  alert?: string;
  analytics?: string;
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
    isOpen={parseBooleanAttr(isOpen)}
    size={isAcceptableSize(size) ? size : null}
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
