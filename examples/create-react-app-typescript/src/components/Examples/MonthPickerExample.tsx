import { MonthPicker } from '@cmsgov/design-system';
import React from 'react';

function MonthPickerExample(): React.ReactElement {
  return (
    <div>
      <h2>MonthPicker Example</h2>
      <MonthPicker
        name="months"
        label="Select the months you were eligible for employer coverage in 2017"
        hint={
          <>
            This is a long-form explanation of what we mean by employer coverage, and at the end of
            this sentence is a link to{' '}
            <a href="#more-info" className="ds-u-color--inherit">
              find out more about employer coverage
            </a>
            .
          </>
        }
        selectAllText="Select all"
        clearAllText="Clear all"
        className="ds-u-margin-y--0"
      />
    </div>
  );
}

export default MonthPickerExample;
