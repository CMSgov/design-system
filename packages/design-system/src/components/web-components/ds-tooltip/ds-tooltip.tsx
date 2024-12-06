import { define } from '../preactement/define';
import { placements, Tooltip, TooltipProps } from '../../Tooltip';
import { Placement } from '@popperjs/core';
import { parseBooleanAttr } from '../wrapperUtils';
import { isPossibleValue } from '../utils';

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
      isPossibleValue(otherProps.placement, placements)
        ? otherProps.placement
        : (Tooltip.defaultProps.placement as Placement)
    }
  ></Tooltip>
);

define('ds-tooltip', () => Wrapper, { attributes });
