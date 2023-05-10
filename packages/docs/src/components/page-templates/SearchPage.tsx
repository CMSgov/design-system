import React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from '@cmsgov/design-system';
import { useFlexSearch } from 'react-use-flexsearch';
import { useStaticQuery, graphql } from 'gatsby';
import { SearchDataStore, SearchQuery } from '../../helpers/graphQLTypes';
import avoidRefresh from '../../helpers/avoidRefresh';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('query'));
  }, []);

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
    <div id="search-results">
      <div className="ds-u-margin-bottom--4">
        <TextField
          label="Enter your search terms below:"
          name="search-field"
          onChange={(evt) => {
            setQuery(evt.target.value);
          }}
          value={query}
        />
      </div>
      <div>
        {results.length > 0 && (
          <div>
            &quot;{query}&quot; returned <strong>{results.length}</strong> results.
          </div>
        )}
        {query && results.length === 0 && (
          <div>Search for &quot;{query}&quot; did not return any results.</div>
        )}
        <ul>
          {results.map((result: SearchDataStore) => (
            <li key={result.id}>
              <a href={location.origin + '/' + result.path + location.search}>{result.title}</a>
              <p>{result.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default avoidRefresh(SearchPage);
