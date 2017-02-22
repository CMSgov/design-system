import React from 'react';
import ReactDOM from 'react-dom';
import Docs from './components/Docs';
const sections = require('../data/sections.json');

ReactDOM.render(
  <Docs sections={sections} />,
  document.getElementById('jsx-root')
);
