/**
 * This is main template file for the documentation site.
 */
import Header from './components/Header';
import Nav from './components/Nav';
import Page from './components/Page';
import PropTypes from 'prop-types';
import React from 'react';

const Docs = (props) => {
  return (
    <div>
      <Header />
      <div className='l-grid'>
        <Nav
          items={props.routes}
          selectedId={props.page.referenceURI}
        />
        <main className='l-col-9 l-col-grow'>
          <Page {...props.page} />
        </main>
      </div>
    </div>
  );
};

Docs.propTypes = {
  page: PropTypes.shape(Page.propTypes).isRequired,
  routes: Nav.propTypes.items
};

export default Docs;
