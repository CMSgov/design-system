import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Tabs, TabPanel } from '../../Tabs';
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
    // 'selected-id': 'tab1',
    // 'tablist-class-name': 'ds-u-padding--2 ds-u-fill--gray-lightest',
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
  // useEffect(() => {
  //   const element = document.querySelector('ds-tabs');
   
  //   if (element) {
  //     const handleStoryBookChange = (event: CustomEvent<{ selectedId: string }>) => {
  //       console.log('event from inside storybook', event)
  //       action('ds-change')(event);
  //     };
  //     element.addEventListener('ds-change', handleStoryBookChange as EventListener);
  //     return () => {
  //       element.removeEventListener('ds-change', handleStoryBookChange as EventListener);
  //     };
  //   }
  // }, []);


  return (
    <ds-tabs {...args}>
      <ds-tab-panel key="summary" id="summary" tab="Summary">
        The Bill of Rights is the first ten amendments to the United States Constitution.
      </ds-tab-panel>
      <ds-tab-panel key="preamble" id="preamble" tab="Preamble">
        <p>We the People of the United States, in Order to form a more perfect Union, establish Justice,
        insure domestic Tranquility, provide for the common defence, promote the general Welfare, and
        secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this
        Constitution for the United States of America.</p> 
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

export const Default = Template.bind({});
Default.args = {
  // 'selected-id': 'tab1',
  'default-selected-id': 'summary',
};

export const WithCustomClasses = Template.bind({});
WithCustomClasses.args = {
  // 'selected-id': 'tab2',
  'default-selected-id': 'summary',
  'tablist-class-name': 'ds-u-padding--4 ds-u-fill--primary-lightest',
};

export const WithDifferentStartingTab = Template.bind({});
WithDifferentStartingTab.args = {
  // 'selected-id': 'tab3',
  'default-selected-id': 'preamble',
};

