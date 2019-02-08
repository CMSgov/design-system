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

ReactDOM.render(
  <div>
    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A' },
        { defaultChecked: true, label: 'Choice 2', value: 'B' }
      ]}
      className="ds-u-margin-top--0"
      label="Radio example"
      name="choices_field"
    />

    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A' },
        {
          defaultChecked: true,
          label: 'Choice 2',
          hint: 'Example hint text',
          value: 'B'
        }
      ]}
      errorMessage="Example error message"
      label="Checkbox example"
      multiple
      name="multiple_choices_field"
    />

    <ChoiceList
      choices={[
        { label: 'Choice 1', requirementLabel: 'Optional', value: 'A' },
        {
          label: 'Choice 2',
          requirementLabel: 'Optional',
          value: 'B'
        }
      ]}
      label="Choices with requirementLabel"
      multiple
      name="some_optional_choices_field"
      requirementLabel="Optional"
    />

    <ChoiceList
      choices={selectChoices}
      hint="Example hint text"
      label="Select example"
      name="select_choices_field"
    />

    <ChoiceList
      choices={selectChoices}
      size="small"
      label="Small select example"
      name="small_select_choices_field"
    />

    <ChoiceList
      choices={selectChoices}
      size="medium"
      label="Medium select example"
      name="medium_select_choices_field"
    />
  </div>,
  document.getElementById('js-example')
);
