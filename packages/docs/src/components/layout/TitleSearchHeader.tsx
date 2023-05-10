import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import CMSLogoIcon from '../icons/CMSLogo';
import { Button, TextInput } from '@cmsgov/design-system';
import { LocationInterface } from '../../helpers/graphQLTypes';

interface TitleSearchHeaderProps {
  location: LocationInterface;
}

const TitleSearchHeader = (props: TitleSearchHeaderProps) => {
  const { location } = props;
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText) {
      window.open(`${location.origin}/search?query=${inputText}`, '_self');
    }
  };

  return (
    <div className="ds-l-row ds-u-margin--0 ds-u-padding--1 ds-u-border-bottom--2">
      <div className="ds-u-display--flex ds-l-col--6 ds-u-align-items--center">
        <CMSLogoIcon />
        <h1 className="ds-u-padding-left--1 ds-text-heading--2xl ds-u-margin--0">Design System</h1>
      </div>
      <form
        className="ds-u-display--flex ds-l-col--6 ds-u-align-items--center ds-u-justify-content--end"
        onSubmit={(evt) => handleSubmit(evt)}
      >
        <TextInput
          type="search"
          size="medium"
          onChange={(evt: ChangeEvent<HTMLInputElement>) => setInputText(evt.target.value)}
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
    </div>
  );
};

export default TitleSearchHeader;
