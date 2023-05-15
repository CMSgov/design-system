import React from 'react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, TextInput } from '@cmsgov/design-system';
import { getQueryParamValue } from '../../helpers/urlUtils';

const SearchForm = (props) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText) {
      window.open(`${location.origin}/search?query=${inputText}`, '_self');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInputText(getQueryParamValue('query') ?? '');
    }
  }, []);

  return (
    <form {...props} onSubmit={(evt) => handleSubmit(evt)}>
      <TextInput
        type="search"
        size="medium"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setInputText(evt.target.value)}
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
