/* eslint-disable react/display-name */
import Button from './Button';
import React from 'react';

export default function() {
  return (
    <div>
      <Button>Button</Button>

      <Button
        className='ds-u-margin-left--1'
        href='javascript:void(0);'
        variation='primary'
      >
        Anchor button
      </Button>
    </div>
  );
}
