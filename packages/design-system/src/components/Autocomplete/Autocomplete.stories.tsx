import { useCallback, useState } from 'react';
import type * as React from 'react';
import { Autocomplete, AutocompleteItem, AutocompleteProps } from './Autocomplete';
import TextField from '../TextField/TextField';
import uniqueId from 'lodash/uniqueId';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { debounce } from '../utilities/debounce';
import { MockedDataResponse, searchMock } from './testMocks';

type AutocompleteArgs = AutocompleteProps & { textFieldLabel: string; textFieldHint: string };

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  args: {
    // setting some defaults so controls turn on by default
    ariaClearLabel: 'Clear search',
    clearInputText: 'Clear search',
    clearSearchButton: true,
    loadingMessage: 'Loading...',
    noResultsMessage: 'No results',
  } as AutocompleteArgs,
  argTypes: {
    ariaClearLabel: {
      table: {
        defaultValue: { summary: 'Clear search to try again' },
      },
    },
    clearInputText: {
      table: {
        defaultValue: { summary: 'Clear Search' },
      },
    },
    loadingMessage: {
      table: {
        defaultValue: { summary: 'Loading...' },
      },
    },
    noResultsMessage: {
      table: {
        defaultValue: { summary: 'No results' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

const Template = (args) => {
  const { items, textFieldLabel, textFieldHint, ...autocompleteArgs } = args;
  const [input, setInput] = useState('');
  const onInputValueChange = (...args) => {
    action('onInputValueChange')(args);
    setInput(args[0]);
  };
  let filteredItems = null;
  if (input.length > 0) {
    filteredItems = items
      .map((item) => {
        if (item.label && item.items) {
          // Handle grouped items
          const filteredGroupItems = item.items.filter(
            (groupItem) =>
              !groupItem.name || groupItem.name.toLowerCase().includes(input.toLowerCase())
          );
          return {
            ...item,
            items: filteredGroupItems,
          };
        } else {
          // Handle standalone items
          return !item.name || item.name.toLowerCase().includes(input.toLowerCase()) ? item : null;
        }
      })
      .filter(Boolean);
  }

  return (
    <Autocomplete
      {...autocompleteArgs}
      onChange={action('onChange')}
      onInputValueChange={onInputValueChange}
      items={filteredItems}
    >
      <TextField label={textFieldLabel} hint={textFieldHint} name="autocomplete" value={input} />
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

function makeGroup(label: string, items: ReturnType<typeof makeItem>[]) {
  return {
    id: uniqueId(),
    label,
    items,
  };
}

export const Default: Story = {
  render: Template,
  args: {
    textFieldLabel: 'Enter and select a drug to see its cost under each plan.',
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
  } as AutocompleteArgs,
};

export const LabeledList: Story = {
  render: Template,
  args: {
    textFieldLabel: 'Search for and select your county.',
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
  } as AutocompleteArgs,
};

export const ItemGroups: Story = {
  render: Template,
  args: {
    textFieldLabel: 'Select a state.',
    textFieldHint:
      'Type "A" then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
    items: [
      makeGroup('Group A', [
        makeItem('Alabama'),
        makeItem('Alaska'),
        makeItem('Arizona'),
        makeItem('Arkansas'),
      ]),
      makeGroup('Group C', [makeItem('California'), makeItem('Colorado'), makeItem('Connecticut')]),
      makeGroup('Group D', [makeItem('Delaware'), makeItem('District of Columbia')]),
    ],
  } as AutocompleteArgs,
};

export const GroupsAndStandaloneItems: Story = {
  render: Template,
  args: {
    textFieldLabel: 'Search for a healthcare specialty or doctor’s office.',
    textFieldHint:
      'Type to filter options. Use ARROW keys to navigate, ENTER to select, ESC to dismiss.',
    items: [
      makeItem('Care Clinic - Specialty Center'),
      makeItem('Healthy Life Gastroenterology - Main Campus'),
      makeItem('Dermatology Associates - East Wing'),
      makeGroup('Healthcare Specialties', [
        makeItem('Pediatrics'),
        makeItem('Gastroenterology'),
        makeItem('Dermatology'),
        makeItem('Cardiology'),
        makeItem('Neurology'),
        makeItem('Orthopedics'),
      ]),
    ],
  } as AutocompleteArgs,
};

export const CustomMarkup: Story = {
  render: Template,
  args: {
    textFieldLabel: 'Select a snack that starts with "C".',
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
  } as AutocompleteArgs,

  parameters: {
    docs: {
      source: {
        code: 'Disabled for this story. See https://github.com/storybookjs/storybook/issues/11554',
      },
    },
  },
};

export const LoadingMessage: Story = {
  render: Template,
  args: {
    clearSearchButton: false,
    loading: true,
    items: [],
    textFieldLabel: 'This will only show a loading message.',
    textFieldHint: 'List should return string Loading to simulate async data call.',
  } as AutocompleteArgs,
};

export const NoResults: Story = {
  render: Template,
  args: {
    items: [],
    clearSearchButton: false,
    textFieldLabel: 'This will show a "no results" message.',
    textFieldHint: 'Start typing, but you’ll only get a "no results" message.',
  } as AutocompleteArgs,
};

export const AsyncItems: Story = {
  render: function Component(args: AutocompleteArgs) {
    const { items, textFieldLabel, textFieldHint, label, ...autocompleteArgs } = args;
    const [input, setInput] = useState('');
    const [additionalItems, setAdditionalItems] = useState<AutocompleteItem[]>([]);
    const hasResults = input.length > 2 && additionalItems.length;

    const searchArtwork = () => {
      // Note: the response is mocked
      const searchURL = `https://api.artic.edu/api/v1/artworks/search?q=${input}&fields=id,title,artist_title&limit=10`;
      fetch(searchURL)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(({ data }: { data: MockedDataResponse[] }) => {
          const additionalItems = data.map(({ id, title, artist_title }) => ({
            id: id.toString(),
            name: `${title} by ${artist_title}`,
          }));
          setAdditionalItems(additionalItems);
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce(() => {
        searchArtwork();
      }, 500),
      []
    );

    const onInputValueChange = (...args) => {
      action('onInputValueChange')(args);
      setInput(args[0]);
      if (input.length > 2 && input !== args[0]) {
        debouncedSearch();
      }
    };

    return (
      <Autocomplete
        {...autocompleteArgs}
        label={hasResults ? undefined : label}
        onChange={action('onChange')}
        onInputValueChange={onInputValueChange}
        items={hasResults ? additionalItems : items}
      >
        <TextField label={textFieldLabel} hint={textFieldHint} name="autocomplete" value={input} />
      </Autocomplete>
    );
  },
  args: {
    textFieldLabel: 'Search for artwork',
    textFieldHint: 'Enter the name of an artist, title, or genre',
    label: 'Popular searches includes:',
    items: [
      makeItem('Mountains'),
      makeItem('Watercolor'),
      makeItem("Georgia O'Keeffe"),
      makeItem('City Landscape'),
      makeItem('Self-Portrait'),
    ],
  } as AutocompleteArgs,
  parameters: {
    fetchMock: {
      mocks: [searchMock],
    },
  },
};
