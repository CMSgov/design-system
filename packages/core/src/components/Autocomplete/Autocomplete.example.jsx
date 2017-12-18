import Autocomplete from './Autocomplete';
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '../TextField/TextField';

ReactDOM.render(
  <div>
    <Autocomplete
      label="Select from the options below:"
      itemToString={i => {
        return i ? i.name : '';
      }}
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
    >
      <TextField
        hint="Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss."
        label="Labeled list"
        name="Downshift_autocomplete"
      />
    </Autocomplete>

    <Autocomplete
      itemToString={i => {
        return i ? i.name : '';
      }}
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
    >
      <TextField
        hint="Type c then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss."
        label="Simple list"
        name="Downshift_autocomplete"
      />
    </Autocomplete>
  </div>,
  document.getElementById('js-example')
);
