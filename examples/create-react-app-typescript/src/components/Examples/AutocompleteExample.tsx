import { Autocomplete, TextField } from '@cmsgov/design-system';
import React from 'react';

function AutocompleteExample() {
  return (
    <div>
      <h2>Autocomplete Example</h2>
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
    </div>
  );
}

export default AutocompleteExample;
