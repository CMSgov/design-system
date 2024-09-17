import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabsProps } from '../../Tabs/Tabs';
import { findElementsOfType } from '../../utilities/findElementsOfType';
import { createElement } from 'react';


const attributes = ['selected-id', 'default-selected-id', 'tablist-class-name', 'children'];

interface WrapperProps extends Omit<TabsProps, 'children'> {
  selectedId?: string;
  defaultSelectedId?: string;
  tablistClassName?: string;
  children: TabsProps['children'];
}

const Wrapper = ({ children = [], ...otherProps }: WrapperProps) => {
  function parseChildren(node) {
    const elements = findElementsOfType(['ds-tab-panel'], node);

    return elements.map(element => {
      const { children, ...attrs } = element.props || {};
      return createElement(TabPanel, { ...attrs }, children)
    });
  
  }
 
  return (
    <Tabs {...otherProps} children={parseChildren(children)}></Tabs>
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
    events: [],
} as any);