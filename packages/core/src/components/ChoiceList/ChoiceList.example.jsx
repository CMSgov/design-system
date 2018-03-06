import ChoiceList from './ChoiceList';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <ChoiceList
      choices={choices()}
      className="ds-u-margin-top--0"
      label="Radio example"
      name="choices_field"
    />
    <ChoiceList
      choices={choices()}
      errorMessage="Example error message"
      label="Checkbox example"
      multiple
      name="multiple_choices_field"
    />
    <ChoiceList
      choices={choicesWithRequirementLabels()}
      label="Choices with requirementLabel"
      multiple
      name="some_optional_choices_field"
      requirementLabel="Optional."
    />
    <ChoiceList
      choices={options()}
      hint="Example hint text"
      label="Select example"
      name="select_choices_field"
    />
    <ChoiceList
      choices={[
        { label: 'A', value: 'A' },
        { defaultChecked: true, label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'F', value: 'F' },
        { label: 'G', value: 'G' },
        { label: 'H', value: 'H' }
      ]}
      size="small"
      label="Small select example"
      name="small_select_choices_field"
    />
    <ChoiceList
      choices={options()}
      size="medium"
      label="Medium select example"
      name="medium_select_choices_field"
    />
  </div>,
  document.getElementById('js-example')
);

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

function choicesWithRequirementLabels() {
  const choicesWithRequirementLabels = generateChoices(3);
  choicesWithRequirementLabels[1].requirementLabel = 'Required.';
  choicesWithRequirementLabels[2].requirementLabel = (
    <span>
      <span className="ds-u-font-weight--bold">Optional.</span> We promise not
      to share your choice.
    </span>
  );

  return choicesWithRequirementLabels;
}

function choices() {
  const choices = generateChoices(4);
  choices[1].defaultChecked = true;
  choices[2].disabled = true;
  return choices;
}

function options() {
  const options = generateChoices(8);
  options[1].defaultChecked = true;
  console.log(options);
  return options;
}
