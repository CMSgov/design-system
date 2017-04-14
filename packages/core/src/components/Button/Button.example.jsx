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
        target='_blank'
        variation='primary'
      >
        React anchor button
      </Button>
    </div>
  );
}
