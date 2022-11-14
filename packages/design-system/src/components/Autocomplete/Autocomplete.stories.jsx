import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
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
  const { textFieldLabel, textFieldHint, ...autocompleteArgs } = args;
  return (
    <Autocomplete
      {...autocompleteArgs}
      // using downshifted props
      onChange={action('onChange')}
      onInputValueChange={action('onInputValueChange')}
    >
      <TextField label={textFieldLabel} hint={textFieldHint} name="Downshift_autocomplete" />
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
