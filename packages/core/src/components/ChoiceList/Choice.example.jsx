import Choice from './Choice';
import ChoiceList from './ChoiceList';
import React from 'react';
import ReactDOM from 'react-dom';

const selectChoices = [
  { label: 'A', value: 'A' },
  { defaultChecked: true, label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' }
];

const childSelect = (
  <ChoiceList
    choices={selectChoices}
    label="Select example"
    name="select_choices_field"
  />
);

ReactDOM.render(
  <div>
    <Choice
      defaultChecked
      hint="Checkbox A hint"
      name="checkbox_choice"
      value="a"
    >
      Checkbox A
    </Choice>
    <Choice name="checkbox_choice" value="b">
      Checkbox B
    </Choice>
    <Choice name="checkbox_choice" value="c">
      Checkbox C
    </Choice>

    <div className="ds-u-margin-top--4">
      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">Checkboxes with children</legend>
        <Choice defaultChecked name="radio_choice" value="a">
          Checkbox A
        </Choice>
        <Choice name="radio_choice" value="b" checkedChildren={childSelect}>
          Checkbox B - with children
        </Choice>
        <Choice name="checkbox_choice" value="c">
          Checkbox C
        </Choice>
      </fieldset>
    </div>

    <div className="ds-u-margin-top--4">
      <Choice name="radio_choice" type="radio" value="a">
        Radio A
      </Choice>
      <Choice name="radio_choice" type="radio" value="b">
        Radio B
      </Choice>
    </div>

    <div className="ds-u-margin-top--4">
      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">Radios with children</legend>
        <Choice name="radio_choice_children" type="radio" value="c">
          Radio C
        </Choice>
        <Choice
          name="radio_choice_children"
          type="radio"
          value="d"
          checkedChildren={childSelect}
        >
          Radio D - with children
        </Choice>
      </fieldset>
    </div>
  </div>,
  document.getElementById('js-example')
);
