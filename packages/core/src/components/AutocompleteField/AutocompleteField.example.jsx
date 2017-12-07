/* eslint-disable react/display-name */
import AutocompleteField from './AutocompleteField';
import React from 'react';

export default function() {
  return (
    <div>
      <AutocompleteField
        items={[
          { name: 'Cook County, IL' },
          { name: 'Cook County, MD' },
          { name: 'Cook County, TN' }
        ]}
        labelText="What zip code did this person live during 2017?"
        onChange={selectedItem => console.log(selectedItem)}
        onStateChange={changes => {
          if (changes.type === '__autocomplete_keydown_enter__') {
            console.log('Yep, completed the process!');
          }
        }}
      />
    </div>
  );
}
