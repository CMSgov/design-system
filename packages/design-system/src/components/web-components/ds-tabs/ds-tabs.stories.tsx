import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-tabs';

const meta: Meta = {
  title: 'Web Components/ds-tabs',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `
For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/tabs/).

The \`ds-tabs\` component accepts regular \`<div>\` elements as children to represent tab panels. Each \`<div>\` should include specific attributes for tab functionality:

- \`id\` (required): A unique identifier for the tab panel.
- \`children\` (required): Content of the tab panel.
- \`class-name\` (optional): Custom class for styling the tab panel container.
- \`data-selected\` (optional): Marks the tab panel as initially selected (\`boolean\`).
- \`data-disabled\` (optional): Disables the tab panel, making it unselectable (\`boolean\`).
- \`data-tab\` (optional): The label shown on the associated tab for this panel.
- \`data-tab-class-name\` (optional): Additional CSS class for styling the associated tab.
- \`data-tab-href\` (optional): URL or link to navigate to when the tab is clicked.
- \`data-tab-id\` (optional): The \`id\` of the associated tab, used for \`aria-labelledby\` accessibility.

**Note:** Only \`id\` and \`children\` are mandatory for each tab panel.
        `,
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
      description:
        'Each child should be a `<div>` with attributes like `id`, `data-selected`, etc. See Docs tab for full details.',
      control: 'object',
      table: {
        type: { summary: 'Array<HTMLElement>' },
        defaultValue: { summary: '[]' },
      },
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
      <div key="summary" id="summary" data-tab="Summary">
        The Bill of Rights is the first ten amendments to the United States Constitution.
      </div>
      <div key="preamble" id="preamble" data-tab="Preamble">
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
      </div>
      <div key="amendments" id="amendments" data-tab="Amendments">
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
      </div>
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
      <div key="summary" id="summary" data-tab="Summary">
        The Bill of Rights is the first ten amendments to the United States Constitution.
      </div>
      <div key="preamble" id="preamble" data-tab="Preamble" aria-label="tams label">
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
      </div>
      <div id="disabled" data-tab="Disabled" data-disabled="true">
        You shouldn’t see this
      </div>
    </ds-tabs>
  );
};

export const Default = Template.bind({});
Default.args = {
  'default-selected-id': 'summary',
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  'default-selected-id': 'summary',
};
