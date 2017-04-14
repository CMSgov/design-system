import Nav from './Nav';
import Page from './Page';
import PropTypes from 'prop-types';
import React from 'react';

const Docs = (props) => {
  return (
    <div>
      <Nav
        currentPageURI={props.page.referenceURI}
        routes={props.routes}
      />
      <main className='page'>
        <Page {...props.page} />
      </main>
    </div>
  );
};

Docs.propTypes = {
  page: PropTypes.shape(Page.propTypes).isRequired,
  routes: Nav.propTypes.routes
};

export default Docs;
