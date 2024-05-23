import type * as React from 'react';
import { ReactNode } from 'react';
import { define } from '../preactement/define';
import { ChoiceList, ChoiceListProps, ChoiceListType } from '../../ChoiceList/ChoiceList';
import { parseBooleanAttr } from '../wrapperUtils';
import { ChoiceProps } from '../../ChoiceList/Choice';
import { findElementsOfType } from '../../utilities/findElementsOfType';
import { formAttrs } from '../shared-attributes/form';

const attributes = [
  'choices',
  'class-name',
  'disabled',
  'inversed',
  'name',
  'root-id',
  'size',
  'type',
  ...formAttrs,
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-choice-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<ChoiceListProps, 'choices' | 'disabled' | 'inversed'> {
  choices?: string | ChoiceListProps['choices'];
  disabled?: string;
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ children, choices, rootId, ...otherProps }: WrapperProps) => {
  function parseChildren(node: ReactNode): Array<ChoiceProps> {
    const elements = findElementsOfType(['ds-choice'], node);
    if (elements.length) {
      return Array.from(elements).map((element) => {
        const { children, ...attrs } = element.props;

        /**
         * Begin logic to define optional nested children of a choice.
         */
        let checkedChild,
          uncheckedChild = undefined;

        if (element.props.children.length > 0) {
          element.props.children.map((child: string | React.ReactElement) => {
            if (typeof child !== 'string') {
              const { children, slot } = child.props;

              if (slot === 'checked-children') {
                checkedChild = children;
              }

              if (slot === 'unchecked-children') {
                uncheckedChild = children;
              }
            }
          });
        }

        return {
          checkedChildren: checkedChild,
          uncheckedChildren: uncheckedChild,
          ...attrs,
        };
      });
    }

    return [];
  }

  return (
    <ChoiceList
      {...otherProps}
      choices={typeof choices === 'string' ? JSON.parse(choices) : parseChildren(children)}
      disabled={parseBooleanAttr(otherProps.disabled)}
      id={rootId}
      inversed={parseBooleanAttr(otherProps.inversed)}
    ></ChoiceList>
  );
};

define('ds-choice-list', () => Wrapper, {
  attributes,
  events: ['onChange', 'onBlur', 'onComponentBlur'],
} as any);
