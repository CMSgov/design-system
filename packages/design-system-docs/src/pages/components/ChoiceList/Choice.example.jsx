import { Choice, TextField } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const childField = (
  <TextField label="Child field" labelClassName="ds-u-margin-top--0" name="textfield_child" />
);

ReactDOM.render(
  <>
    <Choice name="checkbox_choice" type="checkbox" label="Checkbox A" value="a" />
    <Choice
      defaultChecked
      name="checkbox_choice_checked"
      type="checkbox"
      label="Checkbox B with checked children"
      value="b"
      checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    />
    <Choice
      defaultChecked
      name="checkbox_choice_unchecked"
      type="checkbox"
      label="Checkbox C with unchecked children"
      value="c"
      uncheckedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    />
    <Choice
      name="checkbox_choice_disabled"
      type="checkbox"
      label="Disabled Checkbox d"
      value="d"
      disabled
    />
    <Choice
      name="checkbox_choice_small"
      size="small"
      type="checkbox"
      label="Small Checkbox E"
      value="e"
    />
    <Choice name="radio_choice" type="radio" label="Radio A" value="a" />
    <Choice
      name="radio_choice_checked"
      type="radio"
      label="Radio B with checked children"
      value="b"
      checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    />
    <Choice
      defaultChecked
      name="radio_choice_unchecked"
      type="radio"
      label="Radio C with unchecked children"
      value="c"
      uncheckedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    />
    <Choice name="radio_choice_disabled" type="radio" label="Disabled Radio D" value="d" disabled />
    <Choice name="radio_choice_small" size="small" type="radio" label="Small Radio E" value="e" />
  </>,
  document.getElementById('js-example')
);
