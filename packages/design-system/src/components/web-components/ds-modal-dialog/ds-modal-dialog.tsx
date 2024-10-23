import { define } from '../preactement/define';
import { Dialog, DialogProps, DialogSize } from '../../Dialog';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';

const attributes = [
  'actions',
  'actions-class-name',
  'alert',
  'dialog-close-label',
  'backdrop-click-exits',
  'class-name',
  'header-class-name',
  'heading',
  'root-id',
  'is-open',
  'size',
];

interface WrapperProps extends Omit<DialogProps, 'actions' | 'alert' | 'isOpen' | 'size'> {
  actions?: string;
  alert?: string;
  dialogCloseLabel?: string;
  isOpen: string;
  size: string;
}

const isAcceptableSize = (size: string): size is DialogSize => {
  return ['narrow', 'wide', 'full'].includes(size);
};

const Wrapper = ({
  actions,
  alert,
  children,
  dialogCloseLabel,
  isOpen,
  size,
  ...otherProps
}: WrapperProps) => (
  <Dialog
    actions={parseJsonAttr(actions)} // <- see how Kim documents this
    alert={parseBooleanAttr(alert)}
    ariaCloseLabel={dialogCloseLabel}
    isOpen={parseBooleanAttr(isOpen)}
    size={isAcceptableSize(size) ? size : null}
    {...otherProps}
  >
    {children}
  </Dialog>
);

define('ds-modal-dialog', () => Wrapper, {
  attributes,
  events: [
    [
      'onExit',
      (event: MouseEvent | KeyboardEvent) => ({
        detail: { event },
      }),
    ],
  ],
});
