import React from 'react';
import { AutocompleteItem } from './Autocomplete';
import { Item } from 'react-stately';

export function renderReactStatelyItems(items: AutocompleteItem[]) {
  return items.map(({ id, name, children, isResult, ...extraAttrs }: AutocompleteItem) => (
    <Item {...extraAttrs} key={id}>
      {name ?? children}
    </Item>
  ));
}
