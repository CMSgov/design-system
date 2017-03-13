import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './components/Docs';
const sections = require('../data/sections.json');

ReactDOM.render(
  <Docs sections={sections} />,
  document.getElementById('jsx-root')
);

// Enable Webpack hot reloading and tota11y in dev mode
if (module.hot) {
  require('tota11y/build/tota11y.min.js');
  module.hot.accept();
}
