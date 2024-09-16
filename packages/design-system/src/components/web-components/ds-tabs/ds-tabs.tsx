import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabsProps } from '../../Tabs/Tabs';
import { findElementsOfType } from '../../utilities/findElementsOfType';
import React, { cloneElement, createElement } from 'react';

/*
In the Tabs pattern:

- TabPanel components are passed to Tabs as children.
- The Tabs component uses these children to render the tabs and 
their corresponding content panels.
- This pattern keeps the API of the Tabs component clean and declarative, 
allowing you to manage tabbed content by simply nesting TabPanel components inside Tabs.

*/


const attributes = ['selected-id', 'default-selected-id', 'tablist-class-name'];

interface WrapperProps extends Omit<TabsProps, 'children'> {
  selectedId?: string;
  defaultSelectedId?: string;
  tablistClassName?: string;
  children: TabsProps['children'] | undefined;
}

const Wrapper = ({ children, ...otherProps }: WrapperProps) => {
  // function parseChildren(node) {
  //   const elements = findElementsOfType(['ds-tab-panel'], node);

  //   return Array.from(elements).map((element) => {
  //     const { children, ...attrs } = element.props;
  //     if (element?.props?.children) {

  //     }
  //     return { ...attrs, children };
  //   });
  // }
  function parseChildren(node) {
    const elements = findElementsOfType(['ds-tab-panel'], node);

    return Array.from(elements).map((element) => {
      const { children, ...attrs } = element.props || {};

      const parsedChildren = Array.isArray(children)
        ? children.map((child) => {
            if (typeof child === 'string') {
           
              return child;
            }
     
            return parseChildren(child);
          })
        : children;

    
      return createElement(TabPanel, { ...attrs }, parsedChildren);
    });
  }

  return (
    <Tabs {...otherProps} children={parseChildren(children)}>
    </Tabs>
  );
};


  /* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'ds-tabs': JSX.IntrinsicElements['div'] & {
          [K in (typeof attributes)[number]]?: string;
        };
      }
    }
  }
  /* eslint-enable */
  
define('ds-tabs', () => Wrapper, {
  attributes,
    events: [
      'onChange',
    ],
} as any);