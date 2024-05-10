import type * as React from 'react';
import { ReactNode } from 'react';
import { define } from '../preactement/define';
import { ChoiceList, ChoiceListProps } from '../../ChoiceList/ChoiceList';
import { parseBooleanAttr } from '../wrapperUtils';
import { ChoiceProps } from '../../ChoiceList/Choice';
import { findElementsOfType } from '../../utilities/findElementsOfType';

const attributes = [
  'choices',
  'class-name',
  'disabled',
  'error-id',
  'error-message-class-name',
  'error-message',
  'error-placement',
  'hint-id',
  'hint',
  'inversed',
  'label-class-name',
  'label-id',
  'label',
  'name',
  'requirement-label',
  'root-id',
  'size',
  'type',
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
        const { ...attrs } = element.props;
        // const { checkedChildren, uncheckedChildren, ...attrs } = element.props;

        // let checkedChild,
        //   uncheckedChild = undefined;
        // if (element.props.children.length > 0) {
        //   const { children, slot } = element.props.children[0].props;

        //   if (slot === 'checked-children') {
        //     return (checkedChild = children);
        //   }

        //   if (slot === 'unchecked-children') {
        //     return (uncheckedChild = children);
        //   }
        // }

        return {
          // checkedChildren: checkedChild,
          // uncheckedChildren: uncheckedChild,
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
