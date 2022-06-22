import React from 'react';
import classNames from 'classnames';

import VerticalNav from './VerticalNav';
import VerticalNavItem from './VerticalNavItem';
import VerticalNavItemLabel from './VerticalNavItemLabel';

export default {
  title: 'Components/Vertical Nav',
  component: VerticalNav,
  argTypes: {
    collapsed: {
      control: 'radio',
      options: [true, false],
      defaultValue: false,
    },
    nested: {
      control: 'radio',
      options: [true, false],
      defaultValue: false,
    },
  },
  subcomponents: { VerticalNavItem, VerticalNavItemLabel },
};

const Template = ({ data, ...args }) => <VerticalNav {...args} />;

const Link = ({ className, ...props }) => (
  // <Link to={props.href} {...props}>{props.children}</Link>
  <a className={classNames(className, 'special-link')} {...props}>
    {props.children}
  </a>
);

export const DefaultVerticalNav = Template.bind({});
DefaultVerticalNav.args = {
  selectedId: 'team',
  ariaNavLabel: 'Primary',
  items: [
    {
      label: 'Parent link',
      url: 'javascript:void(0);',
      id: 'parentlink1',
    },
    {
      label: 'Current page',
      selected: true,
      items: [
        {
          id: 'childlink1',
          label: 'Child link',
          url: 'javascript:void(0);',
        },
        {
          label: 'Child link',
          selected: true,
          component: Link,
          items: [
            {
              id: 'grandchildlink1',
              label: 'Grandchild link',
              url: 'javascript:void(0);',
            },
            {
              id: 'grandchildlink2',
              label: 'Grandchild link',
              url: 'javascript:void(0);',
              selected: true,
            },
          ],
        },
        {
          id: 'childlink3',
          label: 'Child link',
          url: 'javascript:void(0);',
        },
      ],
    },
    {
      label: 'Parent link',
      url: 'javascript:void(0);',
      id: 'parentlink2',
    },
  ],
};
