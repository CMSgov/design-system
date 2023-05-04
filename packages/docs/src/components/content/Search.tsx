import React from 'react';
import { useState } from 'react';
import { TextField } from '@cmsgov/design-system';
import { useFlexSearch } from 'react-use-flexsearch';
import { useStaticQuery, graphql } from 'gatsby';
import { SearchDataStore, SearchQuery } from '../../helpers/graphQLTypes';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const data: SearchQuery = useStaticQuery(graphql`
    {
      localSearchPages {
        index
        store
      }
    }
  `);

  const { index, store } = data.localSearchPages;
  const results = useFlexSearch(query, index, store);

  return (
    <>
      <TextField
        label="Search"
        name="search-field"
        onChange={(evt) => {
          setQuery(evt.target.value);
        }}
      />
      <ul>
        {results.map((result: SearchDataStore) => (
          <li key={result.id}>
            <a href={location.origin + '/' + result.path + location.search}>{result.title}</a>
            <p>{result.excerpt}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchBar;
