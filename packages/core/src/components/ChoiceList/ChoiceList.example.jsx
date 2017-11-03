/* eslint-disable react/display-name */
import ChoiceList from './ChoiceList';
import React from 'react';

function generateChoices(length) {
  const choices = [];

  for (let i = 0; i < length; i++) {
    choices.push({
      label: `Choice ${i + 1}`,
      value: String(i + 1)
    });
  }

  return choices;
}

export default function() {
  const choices = generateChoices(4);
  const options = generateChoices(8);

  choices[1].defaultChecked = true;
  choices[2].disabled = true;
  options[1].defaultChecked = true;

  const choicesWithRequirementLabels = generateChoices(3);
  choicesWithRequirementLabels[1].requirementLabel = 'Required.';
  choicesWithRequirementLabels[2].requirementLabel = (
    <span>
      <span className="ds-u-font-weight--bold">Optional.</span> We promise not
      to share your choice.
    </span>
  );

  return (
    <div>
      <ChoiceList
        choices={choices}
        className="ds-u-margin-top--0"
        label="Radio example"
        name="choices_field"
      />
      <ChoiceList
        choices={choices}
        errorMessage="Example error message"
        label="Checkbox example"
        multiple
        name="multiple_choices_field"
      />
      <ChoiceList
        choices={choices}
        requirementLabel="Optional."
        label="Optional Example"
        name="optional_choices_field"
      />
      <ChoiceList
        choices={choicesWithRequirementLabels}
        label="Choice-Optional Example"
        multiple
        name="some_optional_choices_field"
      />
      <ChoiceList
        choices={options}
        hint="Example hint text"
        label="Select example"
        name="select_choices_field"
      />
    </div>
  );
}
