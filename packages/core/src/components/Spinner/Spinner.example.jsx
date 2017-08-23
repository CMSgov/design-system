/* eslint-disable react/display-name */
import Button from '../Button/Button';
import Spinner from './Spinner';
import React from 'react';

export default function() {
  return (
    <div>
      <div className='ds-u-display--inline-block ds-u-padding--3'>
        <Spinner className='ds-u-valign--middle' />
      </div>
      <div className='ds-u-display--inline-block ds-u-padding--2 ds-u-fill--background-inverse'>
        <Spinner filled className='ds-u-valign--middle' />
      </div>
      <div className='ds-u-display--inline-block ds-u-padding--2'>
        <Spinner filled inversed className='ds-u-valign--middle' />
      </div>
      <div className='ds-u-margin-top--2 ds-u-padding--2 ds-u-fill--background-inverse'>
        <Button variation='inverse' className="ds-u-margin-right--1">Cancel</Button>
        <Button variation='primary' disabled>
          <Spinner className='ds-u-margin-right--1' />
          Saving
        </Button>
      </div>
    </div>
  );
}
