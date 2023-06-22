import React from 'react';
import classNames from 'classnames';

import VerticalNav from './VerticalNav';
import VerticalNavItem from './VerticalNavItem';
import VerticalNavItemLabel from './VerticalNavItemLabel';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof VerticalNav> = {
  title: 'Components/Vertical Nav',
  component: VerticalNav,
  args: {
    collapsed: false,
    nested: false,
  },
  subcomponents: { VerticalNavItem, VerticalNavItemLabel },
};
export default meta;

type Story = StoryObj<typeof VerticalNav>;

const Link = ({ className, ...props }) => (
  // <Link to={props.href} {...props}>{props.children}</Link>
  <a className={classNames(className, 'special-link')} {...props}>
    {props.children}
  </a>
);

export const Default: Story = {
  args: {
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
  },
};
