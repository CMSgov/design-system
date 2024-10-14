import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import { useArgs } from '@storybook/preview-api';
import './ds-tab-panel';

const meta: Meta = {
  title: 'Web Components/ds-tab-panel',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/tabs/).',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Content to be displayed inside the `ds-tab-panel` component.',
    },
    selected: {
      description:
        'Sets the selected state of the `ds-tab-panel`. If true, this panel will be displayed.',
      control: 'boolean',
    },
    disabled: {
      description: 'Disables the `ds-tab-panel`. If true, this panel will not be selectable.',
      control: 'boolean',
    },
    tab: {
      description: 'The label to display for the associated tab.',
      control: 'text',
    },
    'tab-href': {
      description: 'The `href` attribute for the associated tab, if it should behave as a link.',
      control: 'text',
    },
    'tab-id': {
      description: 'The unique ID of the associated tab.',
      control: 'text',
    },
    'tab-class-name': {
      description: 'Additional classes to be added to the tab for styling purposes.',
      control: 'text',
    },
  },
};

export default meta;

const Template = (args) => {
  const [{ selected, disabled }, updateArgs] = useArgs();

  useEffect(() => {
    const isDisabled = disabled === true || disabled === 'true';
    const isSelected = selected === true || selected === 'true';

    // If the tab-panel is disabled, ensure it's not selected.
    if (isDisabled && isSelected) {
      updateArgs({ selected: false });
    }
  }, [disabled, selected, updateArgs]);

  return (
    <ds-tab-panel {...args}>
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
    </ds-tab-panel>
  );
};

export const Default = Template.bind({});
Default.args = {
  tab: 'Tab 1',
  'tab-id': 'tab-1',
  selected: true,
  disabled: false,
};
