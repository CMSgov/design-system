import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-tabs';
import './ds-tab-panel';

const meta: Meta = {
  title: 'Web Components/ds-tabs',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/tabs/).',
      },
      componentEvents: {
        'ds-change': {
          description: "A callback function that's invoked when the selected tab is changed.",
        },
      },
    },
  },
  argTypes: {
    children: {
      description: 'Limited to `ds-tab-panel` components.',
    },
    'default-selected-id': {
      description: 'Sets the id of the `ds-tab-panel` that is initially selected.',
      control: 'text',
    },
    'selected-id': {
      description:
        'Sets the initial selected state to the specified `ds-tab-panel` id. Use this in combination with `onChange` for a controlled component; otherwise, set `defaultSelectedId`',
      control: 'text',
    },
    'tablist-class-name': {
      description: 'Additional classes to be added to the tab list for styling purposes.',
      control: 'text',
    },
    'tabs-aria-label': {
      description:
        'Provides an accessible description of the tabs component for screen readers. This is an alias for the `ariaLabel` prop, which can be used to provide context-specific labels for accessibility purposes.',
      control: 'text',
    },
  },
};

export default meta;

const Template = (args) => {
  useEffect(() => {
    const element = document.querySelector('ds-tabs');
    const handleStorybookChange = (event) => {
      const { selectedId, prevSelectedId } = event.detail;
      action('ds-cshange')(`Selected: ${selectedId}, Previous: ${prevSelectedId}`);
    };

    element.addEventListener('ds-change', handleStorybookChange);
    return () => {
      element.removeEventListener('ds-change', handleStorybookChange);
    };
  }, []);
  return (
    <ds-tabs {...args}>
      <ds-tab-panel key="summary" id="summary" tab="Summary">
        The Bill of Rights is the first ten amendments to the United States Constitution.
      </ds-tab-panel>
      <ds-tab-panel key="preamble" id="preamble" tab="Preamble">
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
      </ds-tab-panel>
      <ds-tab-panel key="amendments" id="amendments" tab="Amendments">
        <h2 className="ds-text-heading--lg">Bill of Rights</h2>

        <ol className="ds-c-list">
          <li>Freedoms, Petitions, Assembly</li>
          <li>Right to bear arms</li>
          <li>Quartering of soldiers</li>
          <li>Search and arrest</li>
          <li>Rights in criminal cases</li>
          <li>Right to a fair trial</li>
          <li>Rights in civil cases</li>
          <li>Bail, fines, punishment</li>
          <li>Rights retained by the People</li>
          <li>States’ rights</li>
        </ol>

        <h2 className="ds-text-heading--lg">Later Amendments</h2>

        <ol className="ds-c-list" start={11}>
          <li>Lawsuits against states</li>
          <li>Presidential elections</li>
          <li>Abolition of slavery</li>
          <li>Civil rights</li>
          <li>Black suffrage</li>
          <li>Income taxes</li>
          <li>Senatorial elections</li>
          <li>Prohibition of liquor</li>
          <li>Women’s suffrage</li>
          <li>Terms of office</li>
          <li>Repeal of Prohibition</li>
          <li>Term Limits for the Presidency</li>
          <li>Washington, D.C., suffrage</li>
          <li>Abolition of poll taxes</li>
          <li>Presidential succession</li>
          <li>18-year-old suffrage</li>
          <li>Congressional pay raises</li>
        </ol>
      </ds-tab-panel>
    </ds-tabs>
  );
};

const DisabledTemplate = (args) => {
  useEffect(() => {
    const element = document.querySelector('ds-tabs');

    const handleStorybookChange = (event) => {
      const { selectedId, prevSelectedId } = event.detail;
      action('ds-cshange')(`Selected: ${selectedId}, Previous: ${prevSelectedId}`);
    };

    element.addEventListener('ds-change', handleStorybookChange);
    return () => {
      element.removeEventListener('ds-change', handleStorybookChange);
    };
  }, []);
  return (
    <ds-tabs {...args}>
      <ds-tab-panel key="summary" id="summary" tab="Summary">
        The Bill of Rights is the first ten amendments to the United States Constitution.
      </ds-tab-panel>
      <ds-tab-panel key="preamble" id="preamble" tab="Preamble">
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
      </ds-tab-panel>
      <ds-tab-panel id="disabled" tab="Disabled" disabled="true">
        You shouldn’t see this
      </ds-tab-panel>
    </ds-tabs>
  );
};

export const Default = Template.bind({});
Default.args = {
  'default-selected-id': 'summary',
  ariaLabel: 'Tams parent label',
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  'default-selected-id': 'summary',
};
