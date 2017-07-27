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
      <div className='ds-l-row ds-u-flex-wrap--nowrap ds-u-margin--0'>
        <nav className='ds-l-md-col--3 ds-u-border-right--1 ds-u-padding--2 l-sidebar'>
          <Nav items={props.routes} selectedId={props.page.referenceURI} />
        </nav>
        <main className='ds-l-md-col ds-u-padding--0'>
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
