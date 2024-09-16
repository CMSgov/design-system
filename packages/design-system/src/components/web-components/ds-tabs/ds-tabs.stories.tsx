import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-tabs';
import './ds-tab-panel'

const meta: Meta = {
  title: 'Web Components/ds-tabs',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
  args: {
    'selected-id': 'tab1',
    'tablist-class-name': 'ds-u-padding--2 ds-u-fill--gray-lightest',
  },
  argTypes: {
    'selected-id': {
      description: 'Sets the id of the currently selected TabPanel.',
      control: 'text',
    },
    'default-selected-id': {
      description: 'Sets the id of the TabPanel that is initially selected.',
      control: 'text',
    },
    'tablist-class-name': {
      description: 'Additional classes to be added to the tab list for styling purposes.',
      control: 'text',
    },
  },
};

export default meta;

const Template = (args) => {
  useEffect(() => {
    const element = document.querySelector('ds-tabs');
   
    if (element) {
      const handleStoryBookChange = (event: CustomEvent<{ selectedId: string }>) => {
        action('ds-change')(event);
      };
      element.addEventListener('ds-change', handleStoryBookChange as EventListener);
      return () => {
        element.removeEventListener('ds-change', handleStoryBookChange as EventListener);
      };
    }
  }, []);

  return (
    <ds-tabs {...args}>
      <ds-tab-panel key="tab1" id="tab1" tab="Tab 1">
        Content for Tab 1
      </ds-tab-panel>
      <ds-tab-panel key="tab2" id="tab2" tab="Tab 2">
        Content for Tab 2.
      </ds-tab-panel>
      <ds-tab-panel key="tab3" id="tab3" tab="Tab 3">
        Content for Tab 3.
      </ds-tab-panel>
    </ds-tabs>
  );
};

export const Default = Template.bind({});
Default.args = {
  // 'selected-id': 'tab1',
  'default-selected-id': 'tab1',
};

export const WithCustomClasses = Template.bind({});
WithCustomClasses.args = {
  // 'selected-id': 'tab2',
  'default-selected-id': 'tab2',
  'tablist-class-name': 'ds-u-padding--4 ds-u-fill--primary-lightest',
};

export const WithDifferentStartingTab = Template.bind({});
WithDifferentStartingTab.args = {
  // 'selected-id': 'tab3',
  'default-selected-id': 'tab3',
};

