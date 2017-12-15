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
        hint="This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type."
        label="Constrained list"
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
        hint="This is an autocomplete field. Begin typing to search for relevant information. Results will be updated as you type."
        label="Unconstrained list"
        name="Downshift_autocomplete"
      />
    </Autocomplete>
  </div>,
  document.getElementById('js-example')
);
