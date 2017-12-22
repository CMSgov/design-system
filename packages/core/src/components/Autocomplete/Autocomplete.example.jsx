import Autocomplete from './Autocomplete';
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '../TextField/TextField';

ReactDOM.render(
  <div>
    <Autocomplete
      items={[
        {
          id: 'kRf6c2fY',
          name: 'Cook County, IL'
        },
        {
          id: 'lYf5cGfM',
          name: 'Cook County, MD'
        },
        {
          id: 'mZfKcGf9',
          name: 'Cook County, TN'
        },
        {
          id: 'xFz6dLba',
          name: 'Cook County, AK'
        },
        {
          id: 'vTr5c99',
          name: 'Cook County, FL'
        },
        {
          id: 'ntY8Lha',
          name: 'Cook County, AL'
        },
        {
          id: 'uRe0Wqo',
          name: 'Cook County, WA'
        },
        {
          id: 'yUR7MWl',
          name: 'Cook County, OR'
        }
      ]}
      label="Select from the options below:"
      onChange={selectedItem => console.log(selectedItem)}
      onInputValueChange={inputVal =>
        console.log('[Autocomplete]: ' + inputVal)
      }
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
          name: 'Cook County, IL'
        },
        {
          id: 'lYf5cGfM',
          name: 'Cook County, MD'
        },
        {
          id: 'mZfKcGf9',
          name: 'Cook County, TN'
        }
      ]}
      onChange={selectedItem => console.log(selectedItem)}
      onInputValueChange={inputVal =>
        console.log('[Autocomplete]: ' + inputVal)
      }
    >
      <TextField
        hint="Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss."
        label="Simple list"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete items={[]} loading>
      <TextField
        hint="List should return string Loading to simulate async data call."
        label="Loading message"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete items={[]}>
      <TextField
        hint="List should return string No results found."
        label="No results message"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete>
      <TextField
        hint="No list should be shown if no item array is provided and it's not loading. This could be the case if a user has not yet entered the minimum number of characters required for a search."
        label="Nothing shown"
        name="Downshift_autocomplete"
      />
    </Autocomplete>
  </div>,
  document.getElementById('js-example')
);
