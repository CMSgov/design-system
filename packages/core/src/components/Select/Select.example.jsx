/* eslint-disable react/display-name */
import FormLabel from '../Form/FormLabel';
import React from 'react';
import Select from './Select';

export default () => {
  return (
    <Select defaultValue='2' name='select-demo'>
      <option value='1'>Option 1</option>
      <option value='2'>Option 2</option>
      <option value='3'>Option 3</option>
    </Select>
  );
};
