/* eslint-disable react/display-name */
import React from 'react';
import Select from './Select';

export default () => {
  return (
    <Select defaultValue='2' name='select-demo'>
      <option value='1'>Option 1</option>
      <option value='2'>Option 2</option>
      <option value='3'>Option 3</option>
      <option value='4'>Option 4</option>
      <option value='5'>Option 5</option>
      <option value='6'>Option 6</option>
      <option value='7'>Option 7</option>
    </Select>
  );
};
