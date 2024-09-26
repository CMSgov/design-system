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
  'dialog',
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
    'contentHeading' | 'dialog' | 'inversed' | 'showCloseButton' | 'offset' | 'placement' | 'title'
  > {
  contentHeading?: string | TooltipProps['contentHeading'];
  dialog?: string;
  inversed?: string;
  showCloseButton?: string;
  placement?: string;
  rootId?: string;
  includeIcon?: string;
  offset?: string;
  title: string | TooltipProps['title'];
}

const parseOffset = (offset: string): TooltipProps['offset'] => {
  if (typeof offset === 'string') {
    const vals = offset.split(' ');
    const [xOffset, yOffset] = vals;
    return [parseInt(xOffset), parseInt(yOffset)];
  }
  // Else return the default offset value
  return Tooltip.defaultProps.offset as TooltipProps['offset'];
};

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
  offset,
  rootId,
  title,
  ...otherProps
}: WrapperProps) => (
  <Tooltip
    {...otherProps}
    contentHeading={contentHeading}
    dialog={parseBooleanAttr(dialog)}
    inversed={parseBooleanAttr(inversed)}
    showCloseButton={parseBooleanAttr(otherProps.showCloseButton)}
    id={rootId}
    title={title}
    offset={parseOffset(offset)}
    placement={
      isPlacementValue(otherProps.placement)
        ? otherProps.placement
        : (Tooltip.defaultProps.placement as Placement)
    }
  ></Tooltip>
);

define('ds-tooltip', () => Wrapper, { attributes, events: ['onClose', 'onOpen'] });
