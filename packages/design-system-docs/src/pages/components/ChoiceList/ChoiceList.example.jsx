import { ChoiceList } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A' },
        { defaultChecked: true, label: 'Choice 2', value: 'B' },
      ]}
      className="ds-u-margin-top--0"
      label="Checkbox example"
      name="choices_field"
      type="checkbox"
    />
    <ChoiceList
      choices={[
        { label: 'Choice 1', value: 'A' },
        {
          defaultChecked: true,
          label: 'Choice 2',
          hint: 'Choice hint text',
          value: 'B',
        },
      ]}
      errorMessage="Example error message"
      hint="Helpful hint text"
      label="Radio example"
      name="multiple_choices_field"
      type="radio"
    />
    <div className="example--inverse ds-u-margin-top--2">
      <ChoiceList
        choices={[
          { label: 'Choice 1', requirementLabel: 'Choice hint text', value: 'A' },
          { label: 'Choice 2', value: 'B' },
        ]}
        className="ds-u-margin-top--0"
        label="Inverse ChoiceList"
        errorMessage="Example error message"
        hint="Helpful hint text"
        name="inverse_choices_field"
        type="radio"
        inversed
      />
    </div>
  </>,
  document.getElementById('js-example')
);
