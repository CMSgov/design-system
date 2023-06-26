import React, { useState } from 'react';
import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import uniqueId from 'lodash/uniqueId';
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
  },
};

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

function makeItem(name: string, children?: React.ReactNode) {
  return {
    id: uniqueId(),
    name,
    children,
  };
}

export const Default = Template.bind({});
Default.args = {
  textFieldLabel: 'Enter and select a drug to see its cost under each plan',
  textFieldHint:
    'Type a letter to see results, then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
  items: [
    makeItem('Acetaminophen'),
    makeItem('Advil'),
    makeItem('Benadryl'),
    makeItem('Claritin'),
    makeItem('Detrol'),
    makeItem('Excedrin'),
    makeItem('Flonase'),
    makeItem('Gas-X'),
    makeItem('Hydrocortisone'),
    makeItem('Ibuprofen'),
    makeItem('Insulin glargine'),
    makeItem('Jublia'),
    makeItem('Ketoprofen'),
    makeItem('Lidocaine'),
    makeItem('Lunestra'),
    makeItem('Melatonin'),
    makeItem('Meloxicam'),
    makeItem('Neosporin'),
    makeItem('Oxycodone'),
    makeItem('Prednisone'),
    makeItem('Prilosec'),
    makeItem('Quinine'),
    makeItem('Robitussin'),
    makeItem('Sudafed'),
    makeItem('Tamiflu'),
    makeItem('Unisom'),
    makeItem('Vicodin'),
    makeItem('Warfarin'),
    makeItem('Xanax'),
    makeItem('Yonsa'),
    makeItem('Zyrtec'),
  ],
};

export const LabeledList = Template.bind({});
LabeledList.args = {
  textFieldLabel: 'Search for and select your county',
  textFieldHint:
    'Type "C" then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
  label: 'Select from the options below:',
  items: [
    makeItem('Cook County, IL'),
    makeItem('Cook County, MD'),
    makeItem('Cook County, TN'),
    makeItem('Cook County, AK'),
    makeItem('Cook County, FL'),
    makeItem('Cook County, AL'),
    makeItem('Cook County, WA'),
    makeItem('Cook County, OR'),
  ],
};

export const CustomMarkup = Template.bind({});
CustomMarkup.args = {
  textFieldLabel: 'Select a snack that starts with "C"',
  textFieldHint:
    'Type "C" to start seeing a list of snacks. Clicking the last item should not change the input value to "Search all snacks"',
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
CustomMarkup.parameters = {
  docs: {
    source: {
      code: 'Disabled for this story. See https://github.com/storybookjs/storybook/issues/11554',
    },
  },
};

export const LoadingMessage = Template.bind({});
LoadingMessage.args = {
  clearSearchButton: false,
  loading: true,
  items: [],
  textFieldLabel: 'This will only show a loading message',
  textFieldHint: 'List should return string Loading to simulate async data call.',
};

export const NoResults = Template.bind({});
NoResults.args = {
  items: [],
  clearSearchButton: false,
  textFieldLabel: 'This will show a "no results" message',
  textFieldHint: "Start typing, but you'll only get a loading message.",
};
