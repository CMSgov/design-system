// This script mostly just exists for development purposes. It's really not
// necessary for us to do any client-side rendering in production.
import Docs from './components/Docs';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  /* eslint-disable no-undef */
  <Docs page={page} routes={routes} />,
  document.getElementById('js-root')
);

// Enable Webpack hot reloading and tota11y in dev mode
if (module.hot) {
  require('tota11y/build/tota11y.min.js');
  module.hot.accept();
}
