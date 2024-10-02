import { define } from '../preactement/define';
import { Tooltip, TooltipProps } from '../../Tooltip';
import { Placement } from '@popperjs/core';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'active-class-name',
  'class-name',
  'close-button-label',
  'component',
  'content-heading',
  'dialog',
  'interactive-border',
  'inversed',
  'max-width',
  'placement',
  'root-id',
  'show-close-button',
  'title',
  'transition-duration',
  'trigger-aria-label',
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
    | 'ariaLabel'
    | 'contentHeading'
    | 'dialog'
    | 'inversed'
    | 'showCloseButton'
    | 'offset'
    | 'placement'
    | 'title'
  > {
  contentHeading?: string;
  dialog?: string;
  inversed?: string;
  showCloseButton?: string;
  placement?: string;
  rootId?: string;
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

const Wrapper = ({
  contentHeading,
  dialog,
  inversed,
  rootId,
  title,
  ...otherProps
}: WrapperProps) => (
  <Tooltip
    {...otherProps}
    ariaLabel={otherProps.triggerAriaLabel}
    contentHeading={contentHeading}
    dialog={parseBooleanAttr(dialog)}
    inversed={parseBooleanAttr(inversed)}
    showCloseButton={parseBooleanAttr(otherProps.showCloseButton)}
    id={rootId}
    title={title}
    placement={
      isPlacementValue(otherProps.placement)
        ? otherProps.placement
        : (Tooltip.defaultProps.placement as Placement)
    }
  ></Tooltip>
);

define('ds-tooltip', () => Wrapper, { attributes });
