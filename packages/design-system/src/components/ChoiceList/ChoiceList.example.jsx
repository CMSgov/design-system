import ChoiceList from './ChoiceList';
import React from 'react';
import ReactDOM from 'react-dom';

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
  </div>,
  document.getElementById('js-example')
);
