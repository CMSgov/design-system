/* eslint-disable react/display-name */
import AutocompleteField from './AutocompleteField';
import React from 'react';
import TextField from '../TextField/TextField';

export default function() {
  return (
    <div>
      <AutocompleteField
        constrainedList
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
        onStateChange={changes => {
          if (changes.type === '__autocomplete_keydown_enter__') {
            console.log('Yep, the user pressed Enter!');
          }

          if (changes.type === '__autocomplete_change_input__') {
            console.log(changes.inputValue);
          }
        }}
      >
        <TextField
          hint="This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type."
          label="Constrained list"
          name="Downshift_autocomplete"
        />
      </AutocompleteField>

      <AutocompleteField
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
        onStateChange={changes => {
          if (changes.type === '__autocomplete_keydown_enter__') {
            console.log('Yep, the user pressed Enter!');
          }

          if (changes.type === '__autocomplete_change_input__') {
            console.log(changes.inputValue);
          }
        }}
      >
        <TextField
          hint="This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type."
          label="Unconstrained list"
          name="Downshift_autocomplete"
        />
      </AutocompleteField>

      <AutocompleteField
        isDisabled
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
        onStateChange={changes => {
          if (changes.type === '__autocomplete_keydown_enter__') {
            console.log('Yep, the user pressed Enter!');
          }

          if (changes.type === '__autocomplete_change_input__') {
            console.log(changes.inputValue);
          }
        }}
      >
        <TextField
          hint="This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type."
          label="Disabled autocomplete"
          name="Downshift_autocomplete_disabled"
        />
      </AutocompleteField>
    </div>
  );
}
