import React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from '@cmsgov/design-system';
import { useFlexSearch } from 'react-use-flexsearch';
import { useStaticQuery, graphql } from 'gatsby';
import { MdxQuery, SearchDataStore, SearchQuery } from '../helpers/graphQLTypes';
import Layout from '../components/layout/Layout';
import useTheme from '../helpers/useTheme';

const SearchPage = ({ location }: MdxQuery) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('query'));
  }, []);

  const searchData: SearchQuery = useStaticQuery(graphql`
    {
      localSearchPages {
        index
        store
      }
    }
  `);

  const { index, store } = searchData.localSearchPages;
  const results = useFlexSearch(query, index, store);

  return (
    <Layout
      frontmatter={{
        title: 'Search this site',
      }}
      location={location}
      slug="Search"
      theme={theme}
    >
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
    </Layout>
  );
};

export default SearchPage;
