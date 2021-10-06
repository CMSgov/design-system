import { AddIcon, ArrowsStacked, ArrowIcon, CheckIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <AddIcon />
    <ArrowsStacked />
    <ArrowIcon />
    <ArrowIcon direction="down" />
    <ArrowIcon direction="left" />
    <ArrowIcon direction="right" />
    <CheckIcon />
  </>,
  document.getElementById('js-example')
);
