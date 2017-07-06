import Docs from './Docs';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  /* eslint-disable no-undef */
  <Docs page={page} routes={routes} />,
  document.getElementById('js-root')
);

if (process.env.NODE_ENV === 'development') {
  // Enable tota11y in dev mode
  require('tota11y/build/tota11y.min.js');
}

if (module.hot) {
  // Enable Hot Module Replacement
  module.hot.accept();
}
