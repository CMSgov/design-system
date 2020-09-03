import { Choice, TextField } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const childField = (
  <TextField label="Child field" labelClassName="ds-u-margin-top--0" name="textfield_child" />
);

ReactDOM.render(
  <div className="example--wrapper">
    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">
        <span>Custom checkbox inputs</span>
      </legend>
      <Choice name="checkbox_choice" type="checkbox" label="Checkbox A" value="a" />
      <Choice
        defaultChecked
        name="checkbox_choice"
        type="checkbox"
        label="Checkbox B with checked children"
        value="b"
        checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
      />
      <Choice
        defaultChecked
        name="checkbox_choice"
        type="checkbox"
        label="Checkbox C with unchecked children"
        value="c"
        uncheckedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
      />
      <Choice
        name="checkbox_choice"
        type="checkbox"
        label="Disabled Checkbox d"
        value="d"
        disabled
      />
    </fieldset>
    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">
        <span>Custom radio inputs</span>
      </legend>
      <Choice name="radio_choice" type="radio" label="Radio A" value="a" />
      <Choice
        name="radio_choice"
        type="radio"
        label="Radio B with checked children"
        value="b"
        checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
      />
      <Choice
        defaultChecked
        name="radio_choice"
        type="radio"
        label="Radio C with unchecked children"
        value="c"
        uncheckedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
      />
      <Choice name="radio_choice" type="radio" label="Disabled Radio D" value="d" disabled />
    </fieldset>
  </div>,
  document.getElementById('js-example')
);
