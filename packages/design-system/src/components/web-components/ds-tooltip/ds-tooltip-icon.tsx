import { define } from '../preactement/define';
import { TooltipIcon, TooltipIconProps } from '../../Tooltip';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['inversed'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-tooltip-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<TooltipIconProps, 'inversed'> {
  inversed?: string;
}

const Wrapper = ({ inversed, ...otherProps }: WrapperProps) => (
  <TooltipIcon {...otherProps} inversed={parseBooleanAttr(inversed)}></TooltipIcon>
);

define('ds-tooltip-icon', () => Wrapper, { attributes });
