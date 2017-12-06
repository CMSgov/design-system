/* eslint-disable react/display-name */
import AutocompleteField from './AutocompleteField';
import React from 'react';

export default function() {
  return (
    <div>
      <AutocompleteField
        items={['apple', 'orange', 'carrot']}
        labelText="What zip code did this person live during 2017?"
        onChange={selectedItem => console.log(selectedItem)}
      />
    </div>
  );
}
