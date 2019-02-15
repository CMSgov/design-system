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
    labelClassName="ds-c-label ds-u-margin-top--0"
    name="select_choices_field"
  />
);

ReactDOM.render(
  <div>
    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Checkbox example</legend>
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
    </fieldset>

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Checkbox example with children</legend>
      <Choice
        hint="Checkbox A hint"
        defaultChecked
        name="checkbox_choice_children"
        value="a"
      >
        Checkbox A
      </Choice>
      <Choice
        name="checkbox_choice_children"
        value="b"
        checkedChildren={
          <div className="ds-c-choice__checkedChild">{childSelect}</div>
        }
      >
        Checkbox B - with children
      </Choice>
      <Choice name="checkbox_choice_children" value="c">
        Checkbox C
      </Choice>
    </fieldset>

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Radio example</legend>
      <Choice name="radio_choice" type="radio" value="a">
        Radio A
      </Choice>
      <Choice name="radio_choice" type="radio" value="b">
        Radio B
      </Choice>
    </fieldset>

    <fieldset className="ds-c-fieldset">
      <legend className="ds-c-label">Radio example with children</legend>
      <Choice name="radio_choice_children" type="radio" value="c">
        Radio A
      </Choice>
      <Choice
        name="radio_choice_children"
        type="radio"
        value="d"
        checkedChildren={
          <div className="ds-c-choice__checkedChild">{childSelect}</div>
        }
      >
        Radio B - with children
      </Choice>
    </fieldset>

    <div className="ds-base ds-base--inverse ds-u-padding--2 ds-u-margin-top--2">
      <fieldset className="ds-c-fieldset ds-u-margin-top--0">
        <legend className="ds-c-label">
          Inverse radio example with children
        </legend>
        <Choice
          className="ds-c-choice--inverse"
          name="radio_choice_children"
          type="radio"
          value="c"
        >
          Radio A
        </Choice>
        <Choice
          className="ds-c-choice--inverse"
          name="radio_choice_children"
          type="radio"
          value="d"
          checkedChildren={
            <div className="ds-c-choice__checkedChild">{childSelect}</div>
          }
        >
          Radio B - with children
        </Choice>
      </fieldset>
    </div>
  </div>,
  document.getElementById('js-example')
);
