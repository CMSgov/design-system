import React from 'react';
import { Button, TextInput } from '@cmsgov/design-system';

const SearchForm = (props) => {
  return (
    <form {...props} action="/search" method="GET">
      <TextInput
        type="search"
        size="medium"
        name="query"
        className="ds-u-margin--0 ds-c-field ds-c-field--medium"
      />
      <Button
        isAlternate
        variation="solid"
        type="submit"
        className="search-button ds-u-margin-left--1"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
