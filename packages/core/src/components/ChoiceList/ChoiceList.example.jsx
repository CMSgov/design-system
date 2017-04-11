/* eslint-disable react/display-name */
import ChoiceList from './ChoiceList';
import React from 'react';

function generateChoices(length) {
  let choices = [];

  for (var i = 0; i < length; i++) {
    choices.push({
      label: `Choice ${i + 1}`,
      value: String(i + 1)
    });
  }

  return choices;
}

export default function() {
  let choices = generateChoices(3);
  let options = generateChoices(11);

  choices[1].defaultChecked = true;
  choices[2].disabled = true;
  options[1].defaultChecked = true;

  return (
    <div>
      <ChoiceList
        className='ds-u-margin-top--0'
        choices={choices}
        label='Checkbox example'
        multiple
        name='checkbox_choices_field'
      />
      <ChoiceList
        choices={choices}
        errorMessage='Example error message'
        label='Radio example'
        name='radio_choices_field'
      />
      <ChoiceList
        choices={options}
        hint='Example hint text'
        label='Select example'
        name='select_choices_field'
      />

      <div className='ds-base--inverse ds-u-margin-top--4 ds-u-padding--1'>
        <ChoiceList
          choices={options}
          hint='Example hint text'
          inversed
          label='Select example'
          name='select_choices_field_inverse'
        />
      </div>
    </div>
  );
}
