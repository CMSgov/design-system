import React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from '@cmsgov/design-system';
import { useFlexSearch } from 'react-use-flexsearch';
import { useStaticQuery, graphql } from 'gatsby';
import { MdxQuery, SearchDataStore, SearchQuery } from '../helpers/graphQLTypes';
import Layout from '../components/layout/Layout';
import useTheme from '../helpers/useTheme';

const stripHTML = (s) => {
  if (s === null || s === '') {
    return false;
  } else {
    s = s.toString();
    s = s.replace(/#/gi, '');
    return s.replace(/(<([^>]+)>)/gi, '');
  }
};

const SearchPage = ({ location }: MdxQuery) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('query'));
  }, [location.search]);

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
      <div className="search-results-wrapper">
        <div className="search-form ds-u-margin-bottom--4">
          <TextField
            label="Enter your search terms below:"
            type="search"
            name="search-field"
            onChange={(evt) => {
              setQuery(evt.target.value);
            }}
            value={query}
          />
        </div>
        <div className="search-results">
          {results.length > 0 && (
            <div>
              &quot;{query}&quot; returned <strong>{results.length}</strong> results.
            </div>
          )}
          {query && results.length === 0 && (
            <div>Search for &quot;{query}&quot; did not return any results.</div>
          )}
          <ul>
            {results.map((result: SearchDataStore) => {
              let body = stripHTML(result.body);
              const strLoc = body.indexOf(query);
              if (strLoc <= 0) {
                return;
              } else {
                body = body.slice(strLoc - 100, strLoc + 100);
                body = body.replace(query, `<mark>${query}</mark>`) + '...';
              }
              return (
                <li key={result.id}>
                  <a href={location.origin + '/' + result.path + location.search}>{result.title}</a>
                  <p dangerouslySetInnerHTML={{ __html: body }} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
