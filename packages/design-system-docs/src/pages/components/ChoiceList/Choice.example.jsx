import { Choice, TextField } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const childField = (
  <TextField label="Child field" labelClassName="ds-u-margin-top--0" name="textfield_child" />
);

ReactDOM.render(
  <>
    <Choice name="checkbox_choice" type="checkbox" value="a">
      Checkbox A
    </Choice>
    <Choice
      defaultChecked
      name="checkbox_choice_checked"
      type="checkbox"
      value="b"
      checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    >
      Checkbox B with checked children
    </Choice>
    <Choice
      defaultChecked
      name="checkbox_choice_unchecked"
      type="checkbox"
      value="c"
      uncheckedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    >
      Checkbox C with unchecked children
    </Choice>
    <Choice name="checkbox_choice_disabled" type="checkbox" value="d" disabled>
      Disabled Checkbox D
    </Choice>
    <Choice name="checkbox_choice_small" size="small" type="checkbox" value="e">
      Small Checkbox E
    </Choice>
    <Choice name="radio_choice" type="radio" value="a">
      Radio A
    </Choice>
    <Choice
      name="radio_choice_checked"
      type="radio"
      value="b"
      checkedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    >
      Radio B with checked children
    </Choice>
    <Choice
      defaultChecked
      name="radio_choice_unchecked"
      type="radio"
      value="c"
      uncheckedChildren={<div className="ds-c-choice__checkedChild">{childField}</div>}
    >
      Radio C with unchecked children
    </Choice>
    <Choice name="radio_choice_disabled" type="radio" value="d" disabled>
      Disabled Radio D
    </Choice>
    <Choice name="radio_choice_small" size="small" type="radio" value="e">
      Small Radio E
    </Choice>
  </>,
  document.getElementById('js-example')
);
