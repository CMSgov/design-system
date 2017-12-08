/* eslint-disable react/display-name */
import AutocompleteField from './AutocompleteField';
import React from 'react';

export default function() {
  return (
    <div>
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
        labelText="What zip code did this person live during 2017?"
        onChange={selectedItem => console.log(selectedItem)}
        onStateChange={changes => {
          if (changes.type === '__autocomplete_keydown_enter__') {
            console.log('Yep, the user pressed Enter!');
          }

          if (changes.type === '__autocomplete_change_input__') {
            console.log(changes.inputValue);
          }
        }}
      />

      <AutocompleteField
        disabled
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
        labelText="Disabled autocomplete component"
      />
    </div>
  );
}
