import { useEffect, useState } from 'react';
import { TextField, sendLinkEvent } from '@cmsgov/design-system';
import { useFlexSearch } from 'react-use-flexsearch';
import { useStaticQuery, graphql } from 'gatsby';
import { MdxQuery, SearchDataStore, SearchQuery } from '../helpers/graphQLTypes';
import Layout from '../components/layout/Layout';
import useTheme from '../helpers/useTheme';
import { sendSearchInitiatedEvent } from '../helpers/analytics';

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
            name="search-field"
            onChange={(evt) => {
              const { value } = evt.target;
              setQuery(value);
              sendSearchInitiatedEvent(value);
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
            {results.map((result: SearchDataStore, resultIndex: number) => {
              let body = result.body;
              const strLoc = body.toLowerCase().indexOf(query.toLowerCase());
              body = body.slice(Math.max(strLoc - 160, 0), strLoc + 160);
              const re = new RegExp(query, 'gi');
              body = body.replace(re, `<mark>${query}</mark>`) + '...';

              const sendAnalyticsEvent = () => {
                sendLinkEvent({
                  event_name: 'search_result_engaged',
                  search_result_count: results.length,
                  search_result_position: result.title,
                  search_term: query,
                  search_term_type: 'user_initiated',
                } as any);
              };

              // I found that even though `result.id` is supposed to be defined in the
              // results of `useFlexSearch`, it isn't. So I'm making up a unique key.
              const key = `${resultIndex}-${result.title}`;
              return (
                <li key={key}>
                  <a
                    href={location.origin + '/' + result.path + location.search}
                    onClick={sendAnalyticsEvent}
                  >
                    {result.title}
                  </a>
                  {/* eslint-disable-next-line react/no-danger -- Known-safe source */}
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
