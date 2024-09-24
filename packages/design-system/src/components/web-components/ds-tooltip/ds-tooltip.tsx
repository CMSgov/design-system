import { define } from '../preactement/define';
import { Tooltip, TooltipProps } from '../../Tooltip';
import { Placement } from '@popperjs/core';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'active-class-name',
  'aria-label',
  'class-name',
  'close-button-label',
  'component',
  'content-heading',
  'dialog',
  'id',
  'interactive-border',
  'inversed',
  'max-width',
  'offset',
  'placement',
  'root-id',
  'show-close-button',
  'transition-duration',
  'z-index',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-tooltip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps
  extends Omit<
    TooltipProps,
    'dialog' | 'inversed' | 'showCloseButton' | 'offset' | 'placement' | 'title'
  > {
  dialog?: string;
  inversed?: string;
  showCloseButton?: string;
  placement?: string;
  rootId?: string;
  includeIcon?: string;
  offset?: string;
  title: string;
}

const isPlacementValue = (location: string): location is Placement => {
  return [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ].includes(location);
};

const Wrapper = ({ dialog, inversed, rootId, title, ...otherProps }: WrapperProps) => (
  <Tooltip
    {...otherProps}
    title={title}
    dialog={parseBooleanAttr(dialog)}
    inversed={parseBooleanAttr(inversed)}
    showCloseButton={parseBooleanAttr(otherProps.showCloseButton)}
    id={rootId}
    placement={isPlacementValue(otherProps.placement) ? otherProps.placement : null}
  >
    {otherProps.children}
  </Tooltip>
);

define('ds-tooltip', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] });
