/* eslint-disable react/display-name */
import FormLabel from '../Form/FormLabel';
import React from 'react';
import Select from './Select';

export default () => {
  return (
    <div>
      <FormLabel hint='This is a select field'>
        Field label
      </FormLabel>
      <Select name='select-demo'>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
      </Select>
    </div>
  );
};
