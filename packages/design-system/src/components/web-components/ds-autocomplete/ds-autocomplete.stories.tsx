import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-autocomplete';
import { AutocompleteItem } from '../../Autocomplete';
import uniqueId from 'lodash/uniqueId';
import '../ds-text-field';

const meta: Meta = {
  title: 'Web Components/ds-autocomplete',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
  args: {
    'clear-input-text': 'Clear search',
    'clear-search-button': true,
    'loading-message': 'Loading...',
    'no-results-message': 'No results',
    name: 'ds-autocomplete',
  },
  argTypes: {
    'aria-clear-label': {
      description:
        "Screen reader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.",
      control: 'text',
    },
    'aria-complete-label': {
      description:
        'Control the `TextField` autocomplete attribute. Defaults to "off" to support accessibility. [Read more.](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)',
      control: 'text',
    },
    autofocus: {
      description: 'Sets the focus on the select during the first mount',
      control: 'boolean',
    },
    children: { control: false, table: { disable: true } },
    'class-name': {
      description:
        'Additional classes to be added to the root element. Useful for adding utility classes.',
      control: 'text',
    },
    'clear-input-text': {
      description:
        'Text rendered on the page if `clearInput` prop is passed. Default is "Clear search".',
      control: 'text',
    },
    'clear-search-button': {
      description: 'Removes the Clear search button when set to `false`',
      control: 'boolean',
    },
    hint: {
      description: 'An optional hint for the label',
      control: 'text',
    },
    'hint-class-name': {
      control: 'text',
      description: 'Custom CSS class name(s) for the hint element',
    },
    items: {
      description:
        'An array of objects used to populate the suggestion list that appears below the input as users type. Passing an empty array will show a "No results" message. If you do not yet want to show results, this props should be undefined. This parameter needs to be stringified (please see examples for usage and [read more on the autocomplete docs](https://design.cms.gov/storybook/?path=/docs/components-autocomplete--docs):).',
      control: 'text',
    },
    label: {
      description: 'A label for the input',
      control: 'text',
    },
    loading: {
      description:
        'Can be called when the `items` array is being fetched remotely, or will be delayed for more than 1-2 seconds.',
      control: 'boolean',
    },
    'loading-message': {
      description: 'Message users will see when the `loading` prop is passed to `Autocomplete`.',
      control: 'text',
    },
    'menu-heading': {
      description:
        "Adds a heading to the top of the autocomplete list. This can be used to convey to the user that they're required to select an option from the autocomplete list.",
      control: 'text',
    },
    'menu-heading-id': {
      description: 'A unique `id` to be used on the child `TextField` label tag',
      control: 'text',
    },
    name: {
      description: "The `input` field's `name` attribute.",
      control: 'text',
    },
    'no-results-message': {
      description:
        'Message users will see when the `items` array returns empty and the `loading` prop is passed to `<Autocomplete />`.',
      control: 'text',
    },
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
    textFieldHint: {
      table: { disable: true },
    },
    textFieldLabel: {
      table: { disable: true },
    },
    value: {
      description: 'Input value',
      control: 'text',
    },
  },
};
export default meta;

const Template = (args) => {
  const { items, textFieldLabel, textFieldHint, ...autocompleteArgs } = args;
  const [input, setInput] = useState('');

  let filteredItems = null;
  if (input.length > 0 && items) {
    filteredItems = items.filter(
      (item) => !item.name || item.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  useEffect(() => {
    const element = document.querySelector('ds-autocomplete');
    if (element) {
      const handleOnChange = (event: CustomEvent<{ selectedItem: AutocompleteItem }>) => {
        setInput(event.detail.selectedItem.name);
        return action('ds-change')(event);
      };
      const handleOnInputValueChange = (event: CustomEvent<{ value: string }>) => {
        action('ds-input-value-change')(event);
        setInput(event.detail.value);
      };
      element.addEventListener('ds-change', handleOnChange);
      element.addEventListener('ds-input-value-change', handleOnInputValueChange);
      return () => {
        element.removeEventListener('ds-change', handleOnChange);
        element.removeEventListener('ds-input-value-change', handleOnInputValueChange);
      };
    }
  }, []);

  return (
    <ds-autocomplete
      {...autocompleteArgs}
      items={JSON.stringify(filteredItems)}
      label={textFieldLabel}
      hint={textFieldHint}
      value={input}
    />
  );
};

function makeItem(name: string, children?: React.ReactNode) {
  return {
    id: uniqueId(),
    name,
    children,
  };
}

export const Default = {
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
  },
};

export const LabeledList = {
  render: Template,
  args: {
    textFieldLabel: 'Search for and select your county.',
    textFieldHint:
      'Type "C" then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.',
    'menu-heading': 'Select from the options below:',
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
  } as any,
};

// export const CustomMarkup = {
//   render: Template,
//   args: {
//     textFieldLabel: 'Select a snack that starts with "C".',
//     textFieldHint:
//       'Type "C" to start seeing a list of snacks. Clicking the last item should not change the input value to "Search all snacks"',
//     label: 'Select from the options below:',
//     items: [
//       makeItem(
//         'Carrots (1)',
//         <>
//           Carrots <strong>(1)</strong>
//         </>
//       ),
//       makeItem(
//         'Cookies (3)',
//         <>
//           Cookies <strong>(3)</strong>
//         </>
//       ),
//       makeItem(
//         'Crackers (2)',
//         <>
//           Crackers <strong>(2)</strong>
//         </>
//       ),
//       {
//         children: (
//           <a href="#snacks" onClick={() => console.log('Searching for all the snacks!')}>
//             Search all snacks
//           </a>
//         ),
//         className: 'ds-c-autocomplete__search-all',
//         isResult: false,
//       },
//     ],
//   } as any,

//   parameters: {
//     docs: {
//       source: {
//         code: 'Disabled for this story. See https://github.com/storybookjs/storybook/issues/11554',
//       },
//     },
//   },
// };

export const LoadingMessage = {
  render: Template,
  args: {
    clearSearchButton: false,
    loading: true,
    items: [],
    textFieldLabel: 'This will only show a loading message.',
    textFieldHint: 'List should return string Loading to simulate async data call.',
  } as any,
};

export const NoResults = {
  render: Template,
  args: {
    items: [],
    clearSearchButton: false,
    textFieldLabel: 'This will show a "no results" message.',
    textFieldHint: 'Start typing, but you’ll only get a "no results" message.',
  } as any,
};
