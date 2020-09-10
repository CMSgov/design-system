import { MonthPicker } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
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
    />
    <div className="example--wrapper example--inverse">
      <MonthPicker
        name="cryosleep-months"
        errorMessage="Select at least one month"
        label="Inverse example"
        disabledMonths={[7, 8, 9, 10, 11, 12]}
        inversed
      />
    </div>
  </div>,
  document.getElementById('js-example')
);
