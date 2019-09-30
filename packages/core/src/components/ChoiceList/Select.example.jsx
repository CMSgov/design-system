import React from 'react';
import ReactDOM from 'react-dom';
import Select from './Select';

ReactDOM.render(
  <div>
    <Select aria-label="Small select" defaultValue="2" name="select-demo">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4">Option 4</option>
      <option value="5">Option 5</option>
      <option value="6">Option 6</option>
      <option value="7">Option 7</option>
    </Select>
    <h4>Small size modifier</h4>
    <Select
      aria-label="Medium select"
      defaultValue="Jr."
      size="small"
      name="small-select-demo"
    >
      <option value="Jr.">Jr.</option>
      <option value="Sr.">Sr.</option>
    </Select>
    <h4>Medium size modifier</h4>
    <Select
      aria-label="Large select"
      defaultValue="2"
      size="medium"
      name="medium-select-demo"
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4">Option 4</option>
      <option value="5">Option 5</option>
      <option value="6">Option 6</option>
      <option value="7">Option 7</option>
    </Select>
  </div>,
  document.getElementById('js-example')
);
