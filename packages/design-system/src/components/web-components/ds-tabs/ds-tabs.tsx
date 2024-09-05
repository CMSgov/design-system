import { define } from '../preactement/define';
import { Tabs } from '../../Tabs';
import { TabsProps } from '../../Tabs/Tabs';

/*
In the Tabs pattern:

- TabPanel components are passed to Tabs as children.
- The Tabs component uses these children to render the tabs and 
their corresponding content panels.
- This pattern keeps the API of the Tabs component clean and declarative, 
allowing you to manage tabbed content by simply nesting TabPanel components inside Tabs.

*/



const attributes = [
    'children', 
    'default-selected-id',
    'selected-id',
    'tablist-class-name'
];
  

interface WrapperProps extends Omit<TabsProps, 'children'> {
    children: TabsProps['children'] | undefined;
}

const Wrapper = ({
    children,
    defaultSelectedId,
    selectedId,
    tablistClassName
  }: WrapperProps) => {
    return (
      <Tabs
        children={children}
        defaultSelectedId={defaultSelectedId}
        selectedId={selectedId}
        tablistClassName={tablistClassName}
      />
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