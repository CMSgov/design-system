/* eslint-disable react/display-name */
import AutocompleteField from './AutocompleteField';
import React from 'react';

export default function() {
  return (
    <div>
      <AutocompleteField
        items={['apple', 'orange', 'carrot']}
        onChange={selectedItem => console.log(selectedItem)}
      />
    </div>
  );
}
