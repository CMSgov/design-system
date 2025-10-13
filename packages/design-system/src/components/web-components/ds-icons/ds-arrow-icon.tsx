import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { ArrowIcon, ArrowIconDirectionType, IconCommonProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

const arrowAttributes = [...attributes, 'direction'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-arrow-icon': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof arrowAttributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<IconCommonProps, 'ariaHidden'> {
  ariaHidden?: string;
  direction?: ArrowIconDirectionType;
}

const Wrapper = ({ ariaHidden = 'true', ...otherProps }: WrapperProps) => (
  <ArrowIcon ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-arrow-icon', () => Wrapper, { attributes: arrowAttributes });
