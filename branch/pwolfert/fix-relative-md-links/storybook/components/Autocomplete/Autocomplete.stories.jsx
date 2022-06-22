import React from 'react';
import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    clearInputText: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    // don't need to show empty textfield row
    textField: {
      table: { disable: true },
    },
    // items is an array, controls can be wonky
    items: { control: false },
  },
  args: {
    // setting some defaults so controls turn on by default
    clearInputText: 'Clear Search',
    clearInputOnBlur: true,
    clearSearchButton: true,
    loadingMessage: 'Loading...',
    noResultsMessage: 'No results',
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

const listOpts = [
  {
    id: 'kRf6c2fY',
    name: 'Cook County, IL',
  },
  {
    id: 'lYf5cGfM',
    name: 'Cook County, MD',
  },
  {
    id: 'mZfKcGf9',
    name: 'Cook County, TN',
  },
  {
    id: 'xFz6dLba',
    name: 'Cook County, AK',
  },
  {
    id: 'vTr5c99',
    name: 'Cook County, FL',
  },
  {
    id: 'ntY8Lha',
    name: 'Cook County, AL',
  },
  {
    id: 'uRe0Wqo',
    name: 'Cook County, WA',
  },
  {
    id: 'yUR7MWl',
    name: 'Cook County, OR',
  },
];

const Template = (args) => {
  return (
    <Autocomplete
      {...args}
      // using downshifted props
      onChange={(evt, item) => console.log(item.selectedItem)}
      onInputValueChange={(evt, input) => console.log('[Autocomplete]: ' + input.inputValue)}
    >
      <TextField {...args.textField} name="Downshift_autocomplete" />
    </Autocomplete>
  );
};

export const Default = Template.bind({});
Default.args = {
  textField: {
    hint: 'Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
    label: 'Labeled list',
  },
  items: listOpts,
};

export const LabeledList = Template.bind({});
LabeledList.args = {
  textField: {
    hint: 'Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
    label: 'Labeled list',
  },
  label: 'Select from the options below:',
  items: listOpts,
};

export const CustomMarkup = Template.bind({});
CustomMarkup.args = {
  textField: {
    hint: 'Clicking the last item should not change the input value to "Search all snacks"',
    label: 'List with custom item markup',
  },
  label: 'Select from the options below:',
  items: [
    {
      id: '1',
      name: 'Carrots (1)',
      children: (
        <>
          Carrots <strong>(1)</strong>
        </>
      ),
    },
    {
      id: '2',
      name: 'Cookies (3)',
      children: (
        <>
          Cookies <strong>(3)</strong>
        </>
      ),
    },
    {
      id: '3',
      name: 'Crackers (2)',
      children: (
        <>
          Crackers <strong>(2)</strong>
        </>
      ),
    },
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
  textField: {
    hint: 'List should return string Loading to simulate async data call.',
    label: 'Loading Message',
  },
};

export const NoResults = Template.bind({});
NoResults.args = {
  items: [],
  clearSearchButton: false,
  textField: {
    hint: '',
    label: 'No Results Message',
  },
};
