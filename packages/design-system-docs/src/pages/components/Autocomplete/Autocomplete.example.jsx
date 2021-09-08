import { Autocomplete, TextField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

// Right now the documentation files don't actually get parsed for styles, so
// this is a hack to add custom CSS classes for this example.
const styleElement = document.createElement('style');
styleElement.innerText = `
  .ds-c-autocomplete__search-all.ds-c-autocomplete__list-item--active a {
    color: #fff;
    text-decoration-color: #fff;
  }
`;
document.querySelector('head').appendChild(styleElement);

ReactDOM.render(
  <div>
    <Autocomplete
      items={[
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
      ]}
      label="Select from the options below:"
      onChange={(selectedItem) => console.log(selectedItem)}
      onInputValueChange={(inputVal) => console.log('[Autocomplete]: ' + inputVal)}
    >
      <TextField
        hint="Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss."
        label="Labeled list"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete
      items={[
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
      ]}
      onChange={(selectedItem) => console.log(selectedItem)}
      onInputValueChange={(inputVal) => console.log('[Autocomplete]: ' + inputVal)}
    >
      <TextField
        hint="Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss."
        label="Simple list"
        name="Downshift_autocomplete"
        errorMessage="Example error message"
      />
    </Autocomplete>

    <Autocomplete
      items={[
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
          id: '4',
          children: (
            <a href="#snacks" onClick={() => console.log('Searching for all the snacks!')}>
              Search all snacks
            </a>
          ),
          className: 'ds-c-autocomplete__search-all',
        },
      ]}
      itemToString={(item) => (item && item.name) || ''}
      onChange={(selectedItem) => console.log(selectedItem)}
      onInputValueChange={(inputVal) => console.log('[Autocomplete]: ' + inputVal)}
    >
      <TextField
        hint="Clicking the last item should not change the input value to 'Search all snacks'"
        label="List with custom item markup"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete items={[]} loading clearSearchButton={false}>
      <TextField
        hint="List should return string Loading to simulate async data call."
        label="Loading message"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete items={[]} clearSearchButton={false}>
      <TextField
        hint="List should return string No results found."
        label="No results message"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete clearSearchButton={false}>
      <TextField
        hint="No list should be shown if no item array is provided and it's not loading. This could be the case if a user has not yet entered the minimum number of characters required for a search."
        label="Nothing shown"
        name="Downshift_autocomplete"
      />
    </Autocomplete>
  </div>,
  document.getElementById('js-example')
);
