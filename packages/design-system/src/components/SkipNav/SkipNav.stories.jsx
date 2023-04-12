import React from 'react';
import SkipNav from './SkipNav';

export default {
  title: 'Components/Skip Nav',
  component: SkipNav,
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    href: '#main',
  },
};

const Template = ({ data, ...args }) => <SkipNav {...args} />;

export const DefaultSkipNav = Template.bind({});

export const SkipNavExample = Template.bind({});
SkipNavExample.decorators = [
  (Story) => (
    <div>
      {Story()}
      <nav className="ds-u-padding--3">
        <h1 className="ds-u-margin--0">Navigation</h1>
        <p className="ds-u-margin--0">Clicking on the Skip Nav will skip over this section.</p>
        <ul>
          <li>
            <a href="#">Navigation link 1</a>
          </li>
          <li>
            <a href="#">Navigation link 2</a>
          </li>
        </ul>
      </nav>
      <main id="main" className="ds-u-padding--3 ds-u-fill--gray-lightest" tabIndex="-1">
        <h1 className="ds-u-margin--0">Main content</h1>
        <p className="ds-u-margin--0">Clicking on the Skip Nav will focus this element.</p>
      </main>
    </div>
  ),
];
