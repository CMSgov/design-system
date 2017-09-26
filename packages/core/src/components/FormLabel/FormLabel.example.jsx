/* eslint-disable react/display-name */
import FormLabel from './FormLabel';
import React from 'react';

export default function() {
  return (
    <FormLabel
      errorMessage={<span><em>Yikes!</em> There was an error</span>}
      hint='It must not be the same as your favorite number'
    >
      Please enter your favorite color
    </FormLabel>
  );
}
