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
    children: { control: false },
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
    // TODO: control this
    items: { control: false },
    label: {
      description:
        "Adds a heading to the top of the autocomplete list. This can be used to convey to the user that they're required to select an option from the autocomplete list.",
      control: 'text',
    },
    'label-id': {
      description: 'A unique `id` to be used on the child `TextField` label tag',
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
    'no-results-message': {
      description:
        'Message users will see when the `items` array returns empty and the `loading` prop is passed to `<Autocomplete />`.',
      control: 'text',
    },
    name: {
      description: "The `input` field's `name` attribute.",
      control: 'text',
    },
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
  },
};
export default meta;

const Template = (args) => {
  const { items, textFieldLabel, textFieldHint, ...autocompleteArgs } = args;
  const [input, setInput] = useState('');

  const onInputValueChange = (...args) => {
    action('onInputValueChange')(args);
    setInput(args[0]);
  };
  let filteredItems = null;
  if (input.length > 0) {
    filteredItems = items.filter(
      (item) => !item.name || item.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  useEffect(() => {
    const element = document.querySelector('ds-autocomplete');
    if (element) {
      const handleOnChange = (event: CustomEvent<{ selectedItem: AutocompleteItem }>) => {
        return action('ds-on-change')(event);
      };
      const handleOnInputValueChange = (event: CustomEvent<{ inputValue: string }>) => {
        action('ds-on-input-value-change')(event);
      };
      element.addEventListener('ds-on-change', handleOnChange);
      element.addEventListener('ds-on-input-value-change', handleOnInputValueChange);
      return () => {
        element.removeEventListener('ds-on-change', handleOnChange);
        element.removeEventListener('ds-on-input-value-change', handleOnInputValueChange);
      };
    }
  }, []);

  return (
    <ds-autocomplete
      {...autocompleteArgs}
      onChange={action('onChange')}
      onInputValueChange={onInputValueChange}
      items={filteredItems}
    >
      <ds-text-field
        label={textFieldLabel}
        hint={textFieldHint}
        name="autocomplete"
        value={input}
        size="big"
      />
    </ds-autocomplete>
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
