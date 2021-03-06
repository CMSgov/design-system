import { ChoiceList } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A', defaultChecked: true },
        { label: 'Choice 2', value: 'B' },
        { label: 'Disabled choice 3', value: 'C', disabled: true },
      ]}
      className="ds-u-margin-top--0"
      label="Checkbox example"
      hint="Helpful hint text"
      name="checkbox_choices"
      type="checkbox"
    />
    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A', hint: 'Choice hint text' },
        {
          label: 'Choice 2',
          value: 'B',
        },
      ]}
      errorMessage="Example error message"
      label="Radio example"
      name="radio_choices"
      type="radio"
    />
    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A', defaultChecked: true },
        { label: 'Choice 2', value: 'B' },
      ]}
      label="Small size example"
      name="size-variants"
      type="radio"
      size="small"
    />
    <div className="example--wrapper example--inverse">
      <ChoiceList
        choices={[
          {
            label: 'Choice 1',
            requirementLabel: 'Choice hint text',
            value: 'A',
          },
          { label: 'Choice 2', value: 'B' },
          { label: 'Disabled choice 3', value: 'c', disabled: true },
        ]}
        label="Inverse example"
        errorMessage="Example error message"
        hint="Helpful hint text"
        name="inverse_choices_field"
        type="checkbox"
        inversed
      />
    </div>
  </div>,
  document.getElementById('js-example')
);
