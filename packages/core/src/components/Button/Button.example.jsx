/* eslint-disable react/display-name */
import React from 'react';
import Button from './Button';

export default function() {
  return (
    <div>
      <Button>React button</Button>

      <Button
        className='ds-u-margin-left--1'
        href='http://example.com'
        modifier='primary'
      >
        <svg
          className='ds-u-margin-right--1'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          viewBox='0 0 24 24'
        >
          <use xlinkHref='/1.0.0-alpha.4/public/images/symbols.svg#download' />
        </svg>
        React anchor button
      </Button>
    </div>
  );
}
