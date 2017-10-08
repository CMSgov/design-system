import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import Docs from './Docs';
import React from 'react';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById('js-root');

function render() {
  /* eslint-disable no-undef */
  ReactDOM.render(
    <AppContainer>
      <Docs page={page} routes={routes} />
    </AppContainer>,
    rootEl
  );
  /* eslint-enable */
}

if (process.env.NODE_ENV === 'development') {
  // Enable tota11y in dev mode
  require('tota11y/build/tota11y.min.js');
}

render();

if (module.hot) {
  // Enable Hot Module Replacement
  module.hot.accept('./Docs', () => render());
}
