/* eslint-disable react/display-name */
import DateField from './DateField';
import React from 'react';

export default function() {
  return (
    <DateField
      monthDefaultValue={10}
      dayDefaultValue="31"
      yearDefaultValue="2017"
    />
  );
}
