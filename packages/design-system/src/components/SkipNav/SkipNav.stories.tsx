import React from 'react';
import SkipNav from './SkipNav';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SkipNav> = {
  title: 'Components/SkipNav',
  component: SkipNav,
  args: {
    href: '#main',
  },
};
export default meta;

type Story = StoryObj<typeof SkipNav>;

export const DefaultSkipNav: Story = {};

export const SkipNavExample: Story = {
  decorators: [
    (Story) => (
      <div>
        {Story()}
        <div className="ds-u-padding--3 ds-u-fill--gray-lightest">
          <p className="ds-u-margin-top--0">Open this story in a dedicated tab.</p>
          <p>
            Press <kbd>TAB</kbd> to focus on the SkipNav link, then press <kbd>ENTER</kbd>
          </p>
        </div>
        <nav className="ds-u-padding--3">
          <p className="ds-u-margin-top--0">Using the SkipNav will skip over this section.</p>
          <ul>
            <li>
              <a href="#">Navigation link 1</a>
            </li>
            <li>
              <a href="#">Navigation link 2</a>
            </li>
          </ul>
        </nav>
        <main
          id="main"
          className="ds-u-padding--3 ds-u-fill--gray-lightest ds-u-focus"
          tabIndex={-1}
        >
          <h1 className="ds-u-margin-top--0">Main content</h1>
          <p>After activiating the SkipNav, this element should have focus.</p>
          <p>
            Note that we added a focus ring for the purpose of demonstration, but please do not add
            a focus ring to your <code>main</code> element in production.
          </p>
        </main>
      </div>
    ),
  ],
};
