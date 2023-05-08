import React, { useState } from 'react';
import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import uniqueId from 'lodash/uniqueId';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    children: { control: 'text' },
    clearInputText: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    label: { control: 'text' },
    loadingMessage: { control: 'text' },
    noResultsMessage: { control: 'text' },
    textFieldLabel: { control: 'text' },
    textFieldHint: { control: 'text' },
  },
  args: {
    // setting some defaults so controls turn on by default
    clearInputText: 'Clear search',
    clearInputOnBlur: true,
    clearSearchButton: true,
    loadingMessage: 'Loading...',
    noResultsMessage: 'No results',
    itemToString: (item) => item.name,
  },
  subcomponents: { TextField },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
};

function makeItem(name: string, children?: React.ReactNode) {
  return {
    id: uniqueId(),
    name,
    children,
  };
}

const listOpts = [
  makeItem('Cook County, IL'),
  makeItem('Cook County, MD'),
  makeItem('Cook County, TN'),
  makeItem('Cook County, AK'),
  makeItem('Cook County, FL'),
  makeItem('Cook County, AL'),
  makeItem('Cook County, WA'),
  makeItem('Cook County, OR'),
];

const Template = (args) => {
  const { items, textFieldLabel, textFieldHint, ...autocompleteArgs } = args;
  const [input, setInput] = useState('');
  const onInputValueChange = (...args) => {
    action('onInputValueChange');
    setInput(args[0]);
  };
  let filteredItems = null;
  if (input.length > 0) {
    filteredItems = items.filter(
      (item) => !item.name || item.name.toLowerCase().includes(input.toLowerCase())
    );
    filteredItems.forEach((item) => console.log(item));
  }
  return (
    <Autocomplete
      {...autocompleteArgs}
      onChange={action('onChange')}
      onInputValueChange={onInputValueChange}
      items={filteredItems}
    >
      <TextField
        label={textFieldLabel}
        hint={textFieldHint}
        name="Downshift_autocomplete"
        value={input}
      />
    </Autocomplete>
  );
};

export const Default = Template.bind({});
Default.args = {
  textFieldHint:
    'Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
  textFieldLabel: 'Labeled list',
  items: listOpts,
};

export const LabeledList = Template.bind({});
LabeledList.args = {
  textFieldHint:
    'Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
  textFieldLabel: 'Labeled list',
  label: 'Select from the options below:',
  items: listOpts,
};

export const CustomMarkup = Template.bind({});
CustomMarkup.args = {
  textFieldHint: 'Clicking the last item should not change the input value to "Search all snacks"',
  textFieldLabel: 'List with custom item markup',
  label: 'Select from the options below:',
  items: [
    makeItem(
      'Carrots (1)',
      <>
        Carrots <strong>(1)</strong>
      </>
    ),
    makeItem(
      'Cookies (3)',
      <>
        Cookies <strong>(3)</strong>
      </>
    ),
    makeItem(
      'Crackers (2)',
      <>
        Crackers <strong>(2)</strong>
      </>
    ),
    {
      children: (
        <a href="#snacks" onClick={() => console.log('Searching for all the snacks!')}>
          Search all snacks
        </a>
      ),
      className: 'ds-c-autocomplete__search-all',
      isResult: false,
    },
  ],
};

export const LoadingMessage = Template.bind({});
LoadingMessage.args = {
  clearSearchButton: false,
  loading: true,
  items: [],
  textFieldHint: 'List should return string Loading to simulate async data call.',
  textFieldLabel: 'Loading message',
};

export const NoResults = Template.bind({});
NoResults.args = {
  items: [],
  clearSearchButton: false,
  textFieldHint: '',
  textFieldLabel: 'No results message',
};
