import React from 'react';

import MedicaregovLogo from '../MedicaregovLogo';
import NavigationMenu from '../NavigationMenu';
import Navbar from './Navbar';

export default {
  title: 'Medicare/Navbar',
  component: Navbar,
  argTypes: {
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
  },
  args: {
    children: (
      <>
        <div className="m-c-navbar__section">
          <a href="" className="mct-c-headerLogo">
            <MedicaregovLogo className="mct-c-headerLogo__image" fill="#12890E" />
          </a>
          <div className="m-c-navbar__productName">Medicare Coverage Tools</div>
        </div>
        <div className="m-c-navbar__section m-c-navbar__section--right">
          <NavigationMenu>
            <li className="m-c-navigationMenu__item">
              <a href="#somewhere">A link to somewhere</a>
            </li>
          </NavigationMenu>
        </div>
      </>
    ),
    className: '',
    inverse: true,
  },
};

const Template = ({ data, ...args }) => <Navbar {...args} />;

export const Default = Template.bind({});
